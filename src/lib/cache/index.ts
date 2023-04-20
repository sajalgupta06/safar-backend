declare module "mongoose" {
  interface DocumentQuery<
    T,
    DocType extends import("mongoose").Document,
    QueryHelpers = {}
  > {
    mongooseCollection: {
      name: any;
    };
    cache(options: any): (DocumentQuery<T[], Document> & QueryHelpers) | any;
    useCache: boolean;
    hashKey: string;
  }
  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
  extends DocumentQuery<any, any> {}


 
}

import mongoose from "mongoose";
import util from "util";
import * as redis from "redis";
import Logger from "../../helper/Logger";

let redisUrl = "redis://127.0.0.1:6379";

if(process.env.NODE_ENV=="production")
{
  redisUrl = "redis://redis-server";
}

const client = redis.createClient({ url: redisUrl });

client.connect();
client.on("connect", function () {
  Logger.info("Redis Connected");
});

mongoose.Query.prototype.cache = function (options: any) {
  // set flag to true
  this.useCache = true;

  this.hashKey = JSON.stringify(options.key || "default");

  return this;
};



const exec = mongoose.Query.prototype.exec;


mongoose.Query.prototype.exec = async function overrideExec(...params:any) {
  // return exec.apply(this, params);


  if (!this.useCache) return exec.apply(this, params);

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  try {
    const cacheValue = (await client.HGET(this.hashKey, key)) || "";
    if (cacheValue?.length > 0) {
      const cacheObject = JSON.parse(cacheValue);

      // return Array.isArray(cacheObject)
      //   ? cacheObject.map(doc => new this.model(doc))
      //   : new this.model(cacheObject);

      return cacheObject;
    }

    const result = await exec.apply(this, params);

    if (result) {
      client.HSET(this.hashKey, key, JSON.stringify(result));
    }
    return result;
  } catch (error) {
    return error;
  }
};


const setSearchkey = (keys: string) => {
  client.append("search", keys);
};

module.exports = {
  clearCache(hashKey: string) {
    client.del(JSON.stringify(hashKey));
  },

  setSearchkey,
};

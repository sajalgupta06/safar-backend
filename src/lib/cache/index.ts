import mongoose from "mongoose";
import util from "util";
import * as redis from 'redis';
import Logger  from "../../helper/Logger";

const redisUrl = 'redis://127.0.0.1:6379';

const client = redis.createClient({url:redisUrl});

client.connect()
client.on('connect', function() {
    Logger.info("Redis Connected")
});


// client.hGetAll = util.promisify(client.hGetAll);


mongoose.Query.prototype.cache = function cache(options:any) {
    // set flag to true
    this.useCache = true;
  
    this.hashKey = JSON.stringify(options.key || 'default');

    return this;    
  };


const exec = mongoose.Query.prototype.exec;

// overrideExec(...params)

mongoose.Query.prototype.exec = async function overrideExec(...params){

    if (!this.useCache) return exec.apply(this, params);



   const key =  JSON.stringify(Object.assign({},this.getQuery(),{
        collection:this.mongooseCollection.name
    }))

  



    try {
        const cacheValue = await client.HGET(this.hashKey,key);
        if (cacheValue) {
          const cacheObject = JSON.parse(cacheValue);

          // return Array.isArray(cacheObject)
          //   ? cacheObject.map(doc => new this.model(doc))
          //   : new this.model(cacheObject);

          return cacheObject
        }

        
    
        const result = await exec.apply(this, params);
        if(result)
        {
           
            client.HSET(this.hashKey,key, JSON.stringify(result));
          
        }
        return result;
      } catch (error) {
        return error
    }
}

const setSearchkey = (keys:string)=>{

client.append("search",keys)



}

module.exports = {

    clearCache(hashKey:string) {
      client.del(JSON.stringify(hashKey));
    },

    setSearchkey

  };
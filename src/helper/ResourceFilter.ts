class ResourceFilter {
  resource: any;
  reqQuery: any;
  constructor(resource:any, reqQuery:any) {
    this.resource = resource;
    this.reqQuery = reqQuery;
  }

  filter() {
    const queryObj = { ...this.reqQuery };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.resource = this.resource.find(queryObj).lean();

    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(",").join(" ");
      this.resource = this.resource.sort(sortBy);
    } else {
      this.resource.sort("-createdAt");
    }
    return this;
  }

  limit() {
    if (this.reqQuery.fields) {
      const sortBy = this.reqQuery.fields.split(",").join(" ");
      this.resource = this.resource.select(sortBy);
    } else {
      this.resource = this.resource.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.reqQuery.page * 1 || 1;
    const limit = this.reqQuery.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.resource = this.resource.skip(skip).limit(limit);

    return this;
  }

 
}

export default ResourceFilter;

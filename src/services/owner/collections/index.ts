import { SuccessResponse } from "../../../helper/ApiResponse";
import { InternalError } from "../../../helper/ApiError";
import validator, { ValidationSource } from "../../../helper/validator";
import asyncHandler from "../../../helper/asyncHandler";
import _ from "lodash";
import schema from "./schema";
import CollectionController from "../../../controllers/Collection";
import { ProtectedRequest } from "../../../helper/app-request";

export const createCollection = [

  validator(schema.createCollection,ValidationSource.BODY),
  asyncHandler(async (req:ProtectedRequest, res) => {

      
  
      const collection = await CollectionController.CreateCollectionOwner(req.body)

      if(collection){
        throw new InternalError("Error Occured while fetching collections");

      }

    new SuccessResponse("Company Created  Successfully", {
      collection,
    }).send(res);
  }),
];


export const getAllCollections = [
  asyncHandler(async (req:ProtectedRequest, res) => {
    const collections = await CollectionController.getCollections()
    if (!collections) throw new InternalError("Cannot fetch collections");
    new SuccessResponse("Collections Fetched ", {
      collections
    }).send(res);
  }),
];



import { SuccessResponse } from "../../../helper/ApiResponse";
import { InternalError } from "../../../helper/ApiError";
import validator, { ValidationSource } from "../../../helper/validator";
import asyncHandler from "../../../helper/asyncHandler";
import _ from "lodash";
import schema from "./schema";
import { ProtectedRequest } from "../../../helper/app-request";
import TopTrendingController from "../../../controllers/TopTrending";



export const fetchTopTrending = [

  asyncHandler(async (req:ProtectedRequest, res) => {

  
  
      const result = await TopTrendingController.FETCH_TOP_TRENDING()

    new SuccessResponse("Document Added Successfully",result).send(res);
  }),
];






export const handleAddLocations = [
  validator(schema.addLocations,ValidationSource.BODY),
  asyncHandler(async (req:ProtectedRequest, res) => {

    const data = req.body.locations
  
      const locations = await TopTrendingController.ADD_LOCATIONS(data)

    new SuccessResponse("Location Added Successfully",locations?.locations).send(res);
  }),
];

export const handleAddCollections = [
  validator(schema.addCollections,ValidationSource.BODY),
  asyncHandler(async (req:ProtectedRequest, res) => {

    const data = req.body.collections
  
      const collection = await TopTrendingController.ADD_COLLECTIONS(data)

    new SuccessResponse("Collection Added Successfully",collection?.collections,).send(res);
  }),
];



export const handleDeleteLocation = [
  validator(schema.delete,ValidationSource.BODY),
  asyncHandler(async (req:ProtectedRequest, res) => {

    const id = req.body.id
  
      const locations = await TopTrendingController.DELETE_FROM_LOCATIONS(id)

    new SuccessResponse("location Removed Successfully",[]).send(res);
  }),
];

export const handleDeleteCollection = [
  validator(schema.delete,ValidationSource.BODY),
  asyncHandler(async (req:ProtectedRequest, res) => {

    const id = req.body.id
  
      const collections = await TopTrendingController.DELETE_FROM_COLLECTIONS(id)

    new SuccessResponse("collections Removed Successfully",[]).send(res);
  }),
];



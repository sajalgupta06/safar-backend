import { SuccessResponse } from "../../../helper/ApiResponse";
import { InternalError } from "../../../helper/ApiError";
import validator from "../../../helper/validator";
import asyncHandler from "../../../helper/asyncHandler";
import _ from "lodash";
import schema from "./schema";
import CompanyController from "../../../controllers/Company";
import { ProtectedRequest } from "../../../helper/app-request";
import Logger from "../../../helper/Logger";

export const createCompany = [

  validator(schema.createCompany),
  asyncHandler(async (req:ProtectedRequest, res) => {

 
  
      const company = await CompanyController.create(req.body)

    new SuccessResponse("Company Created  Successfully", {
      company,
    }).send(res);
  }),
];


export const getAllCompany = [
  asyncHandler(async (req:ProtectedRequest, res) => {
    const companies = await CompanyController.findAllCompanyOwner(req.query)
    if (!companies) throw new InternalError("Cannot fetch Companies");
    new SuccessResponse("Companoes Fetched ", {
      companies
    }).send(res);
  }),
];



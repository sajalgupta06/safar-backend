import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helper/validator';


export default {

  addLocations: Joi.object().keys({

    locations: Joi.array().items({
      name:Joi.string().required().max(30),
      slug:Joi.string().required().max(30),
      photo:Joi.string().required(),
    }),
  }),


  delete: Joi.object().keys({
 
    id:JoiObjectId().required()
  }),


 

  addCollections: Joi.object().keys({
    
    collections: Joi.array().items({
      name:Joi.string().required().max(30),
      slug:Joi.string().required().max(30),
      photo:Joi.string().required(),
    }),
  }),


};

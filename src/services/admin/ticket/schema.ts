import Joi from '@hapi/joi';
import { otpInfo } from '../../../config';
import { JoiAuthBearer, JoiObjectId } from '../../../helper/validator';

export default {


  bookTicket: Joi.object().keys({


    passengers: Joi.array().items({
      name:Joi.string().required().max(30),
      phone:Joi.string().required().length(30),
      gender:Joi.string().required().max(6),
      adhr:Joi.string().required().max(12),
      email:Joi.string().required().email(),

    }),


    priceSlot: Joi.object().keys({
      pickupPoint:Joi.string().required().max(30),
      pickupTransMode:Joi.string().required().length(30),
      pickupAc:Joi.boolean().required(),
      dropPoint:Joi.string().required().max(30),
      dropTransMode:Joi.string().required().length(30),
      dropAc:Joi.boolean().required(),
      basePrice:Joi.number().required()
    }),
 
    tripId:JoiObjectId().required()


  }),



};

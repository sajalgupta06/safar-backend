import Joi from '@hapi/joi';
import { otpInfo } from '../../../config';
import { JoiAuthBearer, JoiObjectId } from '../../../helper/validator';

export default {


  bookTicket: Joi.object().keys({


    passengers: Joi.array().items({
      name:Joi.string().required().max(30),
      phone:Joi.string().required().length(10),
      age:Joi.number().required(),
      gender:Joi.string().required().max(6),
      adhr:Joi.string().required().max(12),
      email:Joi.string().required().email(),

    }),


    priceSlots: Joi.object().keys({
      pickupPoint:Joi.string().required().max(30),
      pickupTransMode:Joi.string().required().max(30),
      dropPoint:Joi.string().required().max(30),
      dropTransMode:Joi.string().required().max(30),
      basePrice:Joi.number().required(),
      finalPrice:Joi.number().required()
    }),
 
    tripId:JoiObjectId().required()


  }),



};

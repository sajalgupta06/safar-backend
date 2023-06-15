import Joi from '@hapi/joi';
import { otpInfo } from '../../../config';
import { JoiAuthBearer, JoiObjectId } from '../../../helper/validator';

export default {


  bookTicket: Joi.object().keys({


    passengers: Joi.array().items({
      name:Joi.string().required().max(30),
      age:Joi.number().required(),
      gender:Joi.string().required().max(6),
      mobileNumber:Joi.number(),
      aadharNumber:Joi.number(),
      email:Joi.string().email(),

    }),


    payment:Joi.object().keys({
      mode:Joi.string(),
      amount:Joi.number(),
      status:Joi.boolean()

    }),
    

    tripDetails:Joi.object().keys({ 
      id:JoiObjectId().required(),
      name:Joi.string(),
      slug:Joi.string(),
    
      priceSlot: Joi.object().keys({
        pickupPoint:Joi.string().required().max(30),
        pickupMode:Joi.string().required().max(30),
        dropPoint:Joi.string().required().max(30),
        dropMode:Joi.string().required().max(30),
        amount:Joi.number().required(),
        key:Joi.number(),
        date:Joi.object().keys({
          startDate:Joi.string(),
          endDate:Joi.string(),
          key:Joi.number(),
        })
      })
    })


  }),



};

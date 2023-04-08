import Joi from "@hapi/joi";
import { otpInfo } from "../../../config";
import { JoiAuthBearer, JoiObjectId } from "../../../helper/validator";

export default {
  bookTicket: Joi.object().keys({
    passengers: Joi.array().items({
      name: Joi.string().required().max(30),
      phone: Joi.string().required().length(10),
      age: Joi.string().required().max(2),
      gender: Joi.string().required().max(6),
      adhr: Joi.string().required().max(12),
      email: Joi.string().required().email(),
    }),

    trip: Joi.object().keys({
      id: Joi.string(),
      name: Joi.string(),
      slug: Joi.string(),
      date: Joi.object().keys({
        startDate: Joi.string(),
        endDate: Joi.string(),
      }),
      priceSlot: Joi.object().keys({
        pickupPoint: Joi.string().required().max(30),
        pickupTransMode: Joi.string().required().max(20),
        dropPoint: Joi.string().required().max(30),
        dropTransMode: Joi.string().required().max(20),
        basePrice: Joi.number().required(),
      }),
    }),

    payment: Joi.object().keys({
      amount: Joi.string(),
      mode: Joi.string(),
      status: Joi.boolean(),
    }),
  }),
};

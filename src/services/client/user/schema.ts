import Joi from '@hapi/joi';
import { otpInfo } from '../../../config';
import { JoiAuthBearer } from '../../../helper/validator';

export default {
  userUpdate: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    gender: Joi.string(),
    age:Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().length(10),
    city: Joi.string(),
    country: Joi.string(),
    photo: Joi.any(),
  }),


};

import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../../../helper/validator';

export default {
  loginByEmail: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  loginByPhone: Joi.object().keys({
    phone: Joi.string().required().length(10),
    password: Joi.string().required().min(6),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    phone: Joi.string().required().length(10),
    password: Joi.string().required().min(6),
  }),
};

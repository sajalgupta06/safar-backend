import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../../helper/validator';

export default {
  sendOtp: Joi.object().keys({
    phone: Joi.string().required().length(10),
    
  }),

};

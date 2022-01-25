import Joi from '@hapi/joi';


export default {

  createCompany: Joi.object().keys({
    name: Joi.string().required().min(3),
    
  }) .unknown(true),
};

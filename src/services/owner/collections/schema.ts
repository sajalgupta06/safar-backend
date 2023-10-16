import Joi from '@hapi/joi';


export default {

  createCollection: Joi.object().keys({
    name: Joi.string().required().min(3),
    photo: Joi.string().required(),
    
  }),
};

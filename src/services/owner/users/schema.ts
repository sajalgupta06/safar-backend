import Joi from '@hapi/joi';


export default {
  userUpdate: Joi.object().keys({

    data:Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      gender: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string().length(10),
      city: Joi.string(),
      country: Joi.string(),
      photo: Joi.string(),
    }),
    id: Joi.string().required()
  
  }),
  getUser: Joi.object().keys({
    id: Joi.string().required(),

  }),
  query: Joi.object().keys({
    search: Joi.string(),
    limit: Joi.string().max(2),
    page: Joi.string().max(2),
  }),
 
  


};

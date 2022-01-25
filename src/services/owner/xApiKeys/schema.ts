import Joi from '@hapi/joi';

export default {

  xApiUser: Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    phone: Joi.string().required().length(10),

  }),
};

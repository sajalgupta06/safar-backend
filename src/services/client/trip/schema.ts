import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helper/validator';

export default {
  favouriteTrip: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  query: Joi.object().keys({
    search: Joi.string().required(),
    limit: Joi.string().max(2),
    page: Joi.string().max(2),
  }),

  searchById: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
 
};
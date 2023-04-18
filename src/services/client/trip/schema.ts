import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helper/validator';

export default {
  favouriteTrip: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  query: Joi.object().keys({
    search: Joi.string().required().allow(null,""),
    limit: Joi.string().max(2),
    page: Joi.string().max(2),
    minDays: Joi.string().allow(null,""),
    maxDays: Joi.string().allow(null,""),
    minPrice: Joi.string().allow(null,""),
    maxPrice: Joi.string().allow(null,""),
    sort: Joi.string().allow(null,""),
    sortDirection: Joi.string().allow(null,""),

  }),

  searchById: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
 
};
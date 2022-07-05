import Joi from '@hapi/joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../helper/validator';

export default {
  createWorkingTrip: Joi.object().keys({
    data:Joi.object()
  }).unknown(true),

};
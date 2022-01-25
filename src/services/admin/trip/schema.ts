import Joi from '@hapi/joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../helper/validator';

export default {
  createWorkingTrip: Joi.object().keys({
    companyId: Joi.string().required().length(24),
  }).unknown(true),

};
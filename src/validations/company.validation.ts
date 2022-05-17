import Joi from 'joi';
import { objectId } from './custom.validation';

const createCompany = {
  body: Joi.object().keys({
    companyName: Joi.string().required().trim(),
    companyAddress: Joi.string().required().trim(),
    provinceId: Joi.string().optional(),
    districtId: Joi.string().optional(),
    wardId: Joi.string().optional(),
  }),
};

export const companyValidation = { createCompany };

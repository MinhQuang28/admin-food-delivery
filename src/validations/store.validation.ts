import Joi from 'joi';
import { objectId } from './custom.validation';

const createStore = {
  body: Joi.object().keys({
    storeName: Joi.string().required().trim(),
    companyAddress: Joi.string().required().trim(),
    provinceId: Joi.string().optional(),
    storeImage: Joi.string().optional(),
    storeAddress: Joi.string().optional(),
    districtId: Joi.string().optional(),
    wardId: Joi.string().optional(),
    branchId: Joi.string().custom(objectId),
  }),
};

export const storeValidation = { createStore };

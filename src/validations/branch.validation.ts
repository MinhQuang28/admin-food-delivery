import Joi from 'joi';
import { objectId } from './custom.validation';

const createBranch = {
  body: Joi.object().keys({
    BranchName: Joi.string().required().trim(),
    companyId: Joi.string().custom(objectId),
  }),
};

export const branchValidation = { createBranch };

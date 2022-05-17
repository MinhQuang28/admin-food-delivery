import Joi from 'joi';
import httpStatus from 'http-status';
import { pick } from '../helpers/pick';
import { ApiError } from '../helpers/error';

export const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return ApiError(res, errorMessage.toString(), httpStatus.BAD_REQUEST);
  }
  Object.assign(req, value);
  return next();
};

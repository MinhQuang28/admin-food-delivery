import { Response } from 'express';
import httpStatus from 'http-status';

export const ERROR_MESSAGE = {
  SERVER_ERROR: 'Something went wrong',
  NOT_FOUND: 'Url not found',
};

export const ApiError = (res: Response, error: string, status?: number) => {
  return res.status(status || httpStatus.BAD_REQUEST).json({
    message: error,
  });
};

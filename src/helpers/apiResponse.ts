import { Response } from 'express';
import httpStatus from 'http-status';

export const ApiResponse = (res: Response, data: any, status?: number) => {
  res.status(status || httpStatus.OK).json({
    data,
  });
};

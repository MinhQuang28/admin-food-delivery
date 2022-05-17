import { FoodModel, OptionFoodModel } from '../models';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../helpers/error';
import { ApiResponse } from '../helpers/apiResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createGroupOptionFood = async (req: Request, res: Response, next: NextFunction) => {
  const { optionIds = [], foodIds = [] } = req.body;
  try {
    // check branch id
    const branches = await FoodModel.find().where('_id').in(foodIds).exec();
    const stores = await OptionFoodModel.find().where('_id').in(optionIds).exec();


    if (!branches && !stores) {
      return ApiError(res, 'branchId or storeID need required', httpStatus.BAD_REQUEST);
    }
    const result = {
      branches,
      stores,
    };

    return ApiResponse(res, result, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};


export const GroupOptionFoodController = {
  createGroupOptionFood,
};

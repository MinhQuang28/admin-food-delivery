import { BranchModel, FoodModel, OptionFoodModel, StoreModel } from '../models';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../helpers/error';
import { ApiResponse } from '../helpers/apiResponse';

const createOptionFood = async (req: Request, res: Response, next: NextFunction) => {
  const { optionName, optionStatus, storeId, branchId } = req.body;
  try {
    // check storeId id
  const branch = await BranchModel.findById(branchId);
  const store = await StoreModel.findById(storeId);
  if (!branch && !store) {
    return ApiError(res, 'branchId or storeID need required', httpStatus.BAD_REQUEST);
  }
  
    const optionFood = new OptionFoodModel({
      optionName,
      optionStatus,
      storeId,
      branchId,
    });
    const result = await optionFood.save();
    return ApiResponse(res, result, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};
const getListOptionFoods = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, storeId, branchId } = req.params;
    if (storeId || branchId) {
      const result = await OptionFoodModel.find({
        $or: [{ store: storeId }, { branch: branchId }],
      });
      if (result) {
        return ApiResponse(res, result, httpStatus.OK);
      }
      return ApiError(res, 'storeId not match', httpStatus.BAD_REQUEST);
    }
    const result = await OptionFoodModel.find({})
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return ApiResponse(res, result, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const optionFoodController = {
  createOptionFood,
  getListOptionFoods,
};

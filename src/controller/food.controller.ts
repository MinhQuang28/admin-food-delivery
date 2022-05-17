import { BranchModel, FoodModel, StoreModel } from '../models';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../helpers/error';
import { ApiResponse } from '../helpers/apiResponse';

const createFood = async (req: Request, res: Response, next: NextFunction) => {
  const {
    foodName,
    foodImage,
    foodDescription,
    foodStatus,
    foodGroupName,
    storeId = null,
    branchId = null,
    groupIds,
  } = req.body;
  try {
    // check branch id
    const branch = await BranchModel.findById(branchId);
    const store = await StoreModel.findById(storeId);
    const groups = await FoodModel.find().where('_id').in(groupIds).exec();

    if (!branch && !store) {
      return ApiError(res, 'branchId or storeID need required', httpStatus.BAD_REQUEST);
    }
    if (!groups){
            return ApiError(res, 'groupIds does not match', httpStatus.BAD_REQUEST);

    }
      const food = new FoodModel({
        foodName,
        foodImage,
        foodGroupName,
        foodDescription,
        foodStatus,
        storeId,
        branchId,
        groupIds,
      });
    const result = await food.save();
    return ApiResponse(res, result, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};
const getListFoods = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, foodId } = req.params;
    if (foodId) {
      const result = await FoodModel.findById({ foodId }).populate('groupOptions');
      if (result) {
        return ApiResponse(res, result, httpStatus.OK);
      }
      return ApiError(res, 'storeId not match', httpStatus.BAD_REQUEST);
    }
    const result = await FoodModel.find({})
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return ApiResponse(res, result, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};
const getMenuItemsByStoreId = async (req: Request, res: Response, next: NextFunction) => {
  const { storeId, ingredients } = req.body;
  try {
    const store = await StoreModel.findById(storeId);
    if (!store) {
      return ApiError(res, 'storeId not match', httpStatus.BAD_REQUEST);    }

    const branchId = store.branch.toString();
    const companyId = store.company.toString();

    let menuItems;
    if (ingredients) {
      menuItems = await FoodModel.find({
        $or: [{ store: storeId }, { branch: branchId }, { company: companyId }],
      }).populate('groupOptions');
    } else {
      menuItems = await FoodModel.find({
        $or: [{ store: storeId }, { branch: branchId }, { company: companyId }],
      });
    }

       return ApiResponse(res, menuItems, httpStatus.OK);

  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const foodController = {
  createFood,
  getListFoods,
  getMenuItemsByStoreId,
};

import { BranchModel, StoreModel } from '../models';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../helpers/error';
import { ApiResponse } from '../helpers/apiResponse';

const createStore = async (req: Request, res: Response, next: NextFunction) => {
  const { storeName, branchId, storeImage, provinceId, districtId, storeAddress } = req.body;
  try {
    // check branch id
    const branch = await BranchModel.findById(branchId);
    if (!branch) {
      return ApiError(res, 'branchId not match', httpStatus.BAD_REQUEST);
    }

    const store = new StoreModel({
      storeName,
      branchId: branchId,
      storeImage,
      provinceId,
      districtId,
      storeAddress,
      companyId: branch.companyId.toString(),
    });
    const result = await store.save();
    return ApiResponse(res, result, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};
const getListStore = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, storeId } = req.params;
    if (storeId) {
      const result = await StoreModel.findById({ storeId });
      if (result) {
        return ApiResponse(res, result, httpStatus.OK);
      }
      return ApiError(res, 'storeId not match', httpStatus.BAD_REQUEST);
    }
    const listStore = await StoreModel.find({})
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return ApiResponse(res, listStore, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const storeController = {
  createStore,
  getListStore,
};

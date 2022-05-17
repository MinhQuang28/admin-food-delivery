import { BranchModel, CompanyModel } from '../models';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../helpers/error';
import { ApiResponse } from '../helpers/apiResponse';

const createBranch = async (req: Request, res: Response, next: NextFunction) => {
  const { BranchName, companyId } = req.body;
  try {
    // check company id
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      return ApiError(res, 'CompanyID not match', httpStatus.BAD_REQUEST);
    }
    // create new branch
    const store = new BranchModel({
      BranchName,
      companyId: companyId,
    });
    const result = await store.save();
    console.log(result);
    return ApiResponse(res, result, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getListBranches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.params;
    const listBranches = await BranchModel.find({})
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return ApiResponse(res, listBranches, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const branchController = {
  createBranch,
  getListBranches,
};

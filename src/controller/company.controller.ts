import { CompanyModel } from '../models';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../helpers/error';
import { ApiResponse } from '../helpers/apiResponse';

const createCompany = async (req: Request, res: Response) => {
  const { companyName, provinceId, districtId, wardId, companyAddress } = req.body;
  try {
    const company = new CompanyModel({
      companyName,
      companyAddress,
      provinceId,
      districtId,
      wardId,
    });
    const result = await company.save();
    return ApiResponse(res, result, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getListCompany = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.params;
    const listStore = await CompanyModel.find({})
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return ApiResponse(res, listStore, httpStatus.OK);
  } catch (error) {
    return ApiError(res, error.toString(), httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const companyController = {
  createCompany,
  getListCompany,
};

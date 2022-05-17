import express from 'express';
const router = express.Router();
import { validate } from '../../middlewares/validate';
import { companyController, branchController, storeController, foodController, GroupOptionFoodController, optionFoodController } from '../../controller';
import { companyValidation, verifyPageLimit, storeValidation, branchValidation } from '../../validations';
// list route Company
router.post('/company', validate(companyValidation.createCompany), companyController.createCompany);
router.get('/company', validate(verifyPageLimit), companyController.getListCompany);
//list route branch
router.post('/branch', validate(branchValidation.createBranch), branchController.createBranch);
router.get('/branch', validate(verifyPageLimit), branchController.getListBranches);
//list route store
router.post('/store', validate(storeValidation.createStore), storeController.createStore);
router.get('/store', validate(verifyPageLimit), storeController.getListStore);
//list route food
router.post('/food', validate(storeValidation.createStore), foodController.createFood);
router.get('/food', validate(verifyPageLimit), foodController.getListFoods);
//list route group option food
router.post('/group-option', validate(storeValidation.createStore), GroupOptionFoodController.createGroupOptionFood);
//list route  option food
router.post('/option', validate(storeValidation.createStore), optionFoodController.createOptionFood);
export const apiRouteV1 = router;

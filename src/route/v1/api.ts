import express from 'express';
const router = express.Router();
import { validate } from '../../middlewares/validate';
import { companyController } from '../../controller';
import { companyValidation, verifyPageLimit, storeValidation, branchValidation } from '../../validations';
// list route Company
router.post('/company', validate(companyValidation.createCompany), companyController.createCompany);
router.get('/company', validate(verifyPageLimit), companyController.getListCompany);
//list route branch
router.post('/branch', validate(branchValidation.createBranch), companyController.createCompany);
router.get('/branch', validate(verifyPageLimit), companyController.getListCompany);
//list route store
router.post('/store', validate(storeValidation.createStore), companyController.createCompany);
router.get('/store', validate(verifyPageLimit), companyController.getListCompany);
//list route food
router.post('/food', validate(storeValidation.createStore), companyController.createCompany);
router.get('/food', validate(verifyPageLimit), companyController.getListCompany);
//list route group option food
router.post('/group-option', validate(storeValidation.createStore), companyController.createCompany);
//list route  option food
router.post('/option', validate(storeValidation.createStore), companyController.createCompany);
export const apiRouteV1 = router;

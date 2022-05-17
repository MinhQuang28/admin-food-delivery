import express from 'express';
const router = express.Router();
import { apiRouteV1 } from './api';

router.use('/v1', apiRouteV1);

export const api = router;

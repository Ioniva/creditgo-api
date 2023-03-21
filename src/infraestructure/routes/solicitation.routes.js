import express from 'express';
import {
  getSolicitationByUUID,
  getPendingSolicitations,
  getSolicitationByUUIDWithUserFinancialData,
  updateSolicitationStateByUUID
} from '../../application/controllers/solicitation.controller.js';
import errorHandler from '../middlewares/error/errorHandler.js';

const router = express.Router();

router.get('/:uuid', errorHandler(getSolicitationByUUID));
router.get('/', errorHandler(getPendingSolicitations));
router.get('/details/:uuid', errorHandler(getSolicitationByUUIDWithUserFinancialData));
router.patch('/:uuid', errorHandler(updateSolicitationStateByUUID));

export default router;

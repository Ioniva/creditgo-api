import express from 'express';
import {
  getBankNames,
  getBankTypes,
  createBankAccount,
  deleteBankAccount
} from '../../application/controllers/bank.controller.js';
import { errorHandler } from '../middlewares/error/index.js';

const router = express.Router();

router.get('/names', errorHandler(getBankNames));
router.get('/types', errorHandler(getBankTypes));
router.post('/', errorHandler(createBankAccount));
router.delete('/:uuid', errorHandler(deleteBankAccount));

export default router;

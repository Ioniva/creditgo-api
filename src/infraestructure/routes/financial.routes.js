import express from 'express';
import { createFinancial, deleteFinancial } from '../../application/controllers/financial.controller.js';
import errorHandler from '../middlewares/error/errorHandler.js';

const router = express.Router();

router.post('/', errorHandler(createFinancial));
router.delete('/:uuid', errorHandler(deleteFinancial));

export default router;

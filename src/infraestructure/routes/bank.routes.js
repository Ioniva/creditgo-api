import express from 'express';
import { getBankNames, getBankTypes } from '../../application/controllers/bank.controller.js';

const router = express.Router();

router.get('/names', getBankNames);
router.get('/types', getBankTypes);

export default router;

import express from 'express';
import { getAllRejectionReasons } from '../../application/controllers/rejection-reason.controller.js';
import { errorHandler } from '../middlewares/error/index.js';

const router = express.Router();

router.get('/', errorHandler(getAllRejectionReasons));

export default router;

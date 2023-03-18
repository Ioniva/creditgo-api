import express from 'express';
import { getSolicitationByUUID } from '../../application/controllers/solicitation.controller.js';
import errorHandler from '../middlewares/error/errorHandler.js';

const router = express.Router();

router.get('/:uuid', errorHandler(getSolicitationByUUID));

export default router;

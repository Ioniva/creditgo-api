import express from 'express';
import { getThisUserSolicitations } from '../../application/controllers/solicitation.controller.js';
import errorHandler from '../middlewares/error/errorHandler.js';

const router = express.Router();

router.get('/', errorHandler(getThisUserSolicitations));

export default router;

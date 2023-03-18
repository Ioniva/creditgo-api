import express from 'express';
import { getThisUserSolicitations, createSolicitation } from '../../application/controllers/solicitation.controller.js';
import errorHandler from '../middlewares/error/errorHandler.js';

const router = express.Router();

router.get('/solicitations', errorHandler(getThisUserSolicitations));
router.post('/solicitations', errorHandler(createSolicitation));

export default router;

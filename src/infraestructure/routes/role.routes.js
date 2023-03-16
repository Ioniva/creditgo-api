import express from 'express';
import { createRole, getAllRoles } from '../../application/controllers/role.controller.js';
import errorHandler from '../middlewares/error/errorHandler.js';

const router = express.Router();

router.get('/', errorHandler(getAllRoles));
router.post('/', errorHandler(createRole));

export default router;

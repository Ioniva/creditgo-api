import express from 'express';
import { createRole, getAllRoles } from '../../application/controllers/role.controller.js';
import validatorRoleDTO from '../middlewares/validation/role.validation.js';

const router = express.Router();

router.get('/', getAllRoles);
router.post('/', validatorRoleDTO, createRole);


export default router;

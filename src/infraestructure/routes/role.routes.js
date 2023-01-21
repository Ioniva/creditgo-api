import express from 'express';
import { createRole, getAllRoles } from '../../application/controllers/role.controller.js';
import validatorRoleDTO from '../middlewares/validation/role.validation.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getAllRoles);
router.post('/', validatorRoleDTO, verifyJWT, createRole);


export default router;

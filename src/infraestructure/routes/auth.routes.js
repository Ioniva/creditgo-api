import express from 'express';
import { signup } from '../../application/controllers/auth.controller.js';
// import validatorRoleDTO from '../middlewares/validation/role.validation.js';

const router = express.Router();

router.post('/signup', signup);
// router.post('/', validatorRoleDTO, createRole);


export default router;

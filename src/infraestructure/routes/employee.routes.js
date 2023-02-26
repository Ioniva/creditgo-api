import express from 'express';
import { getEmployeeTypes } from '../../application/controllers/employee.controller.js';

const router = express.Router();

router.get('/types', getEmployeeTypes);

export default router;

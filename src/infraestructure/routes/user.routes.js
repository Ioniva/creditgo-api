import express from 'express';
import { createUser, deleteUser } from '../../application/controllers/user.controller.js';
import { errorHandler } from '../middlewares/error/index.js';

const router = express.Router();

// -- ME --
// router.get("/me", errorHandler(getThisUser));

// -- USERS --
// router.get("/", errorHandler(getAllUsers));
router.post('/', errorHandler(createUser));
router.delete('/:uuid', errorHandler(deleteUser));

export default router;

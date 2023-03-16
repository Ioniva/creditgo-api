import express from 'express';
import { signin, signup, signDelete } from '../../application/controllers/login.controller.js';
import errorHandler from '../middlewares/error/errorHandler.js';

const router = express.Router();

router.post('/signin', errorHandler(signin));
router.post('/signup', errorHandler(signup));
router.delete('/:uuid', errorHandler(signDelete));

export default router;

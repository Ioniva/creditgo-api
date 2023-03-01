import express from 'express';
import { createProfile } from '../../application/controllers/profile.controller.js';
import { errorHandler } from '../../infraestructure/middlewares/error/index.js';

const router = express.Router();

// router.get("/me", getCurrentProfile);
router.post('/', errorHandler(createProfile));

export default router;

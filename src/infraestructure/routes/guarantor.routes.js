import express from 'express';
import {
  // updateGuarantorByUserUUID,
  deleteGuarantorByUUID,
  getGuarantorByUUID,
  createGuarantor
} from '../../application/controllers/guarantor.controller.js';
import { errorHandler } from '../middlewares/error/index.js';

const router = express.Router();

router.get('/:uuid', errorHandler(getGuarantorByUUID));
router.post('/', errorHandler(createGuarantor));
// router.patch("/:uuid", errorHandler(updateGuarantorByUserUUID));
router.delete('/:uuid', errorHandler(deleteGuarantorByUUID));

export default router;

import express from 'express'
import { getAllClient } from '../../../application/controllers/client.controller.js'

const router = express.Router()

router.get('/', getAllClient);

export default router;

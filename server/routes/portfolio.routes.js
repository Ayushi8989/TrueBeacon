import express from 'express'
import { getHoldingsResponse } from '../controllers/holdings.controller.js';

const router = express.Router()

router.get('/holdings', getHoldingsResponse);


export default router;
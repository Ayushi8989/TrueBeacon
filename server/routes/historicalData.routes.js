import express from 'express'
import { getHistoricalData } from '../controllers/historicalData.controller.js'

const router = express.Router()

router.get('/historical-data', getHistoricalData);


export default router;
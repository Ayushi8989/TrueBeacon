import express from 'express'
import { getHistoricalData } from '../controllers/historicaldata.controller.js'

const router = express.Router()

router.get('/historical-data', getHistoricalData);


export default router;
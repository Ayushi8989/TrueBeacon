import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import historicalRoute from './routes/historicaldata.routes.js'

dotenv.config()

const app = express()

const port = process.env.PORT;

app.use(cors({
    origin: '*',
    credentials: true
}));


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome!");
})

app.use('/api', historicalRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost/${port}`);
})
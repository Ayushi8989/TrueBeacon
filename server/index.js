import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import historicalRoutes from './routes/historicaldata.routes.js';
import userRoutes from './routes/user.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';

dotenv.config()

const app = express();

const port = process.env.PORT;
// const jwt_secret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome!");
})

app.use('/api', historicalRoutes);
app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost/${port}`);
})
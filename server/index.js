import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import historicalRoutes from './routes/historicalData.routes.js';
import userRoutes from './routes/user.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import placeOrderRoutes from './routes/placeOrder.routes.js';
import { startWebSocketServer } from './util/webSocket.js';
import { createServer } from 'http';

dotenv.config();

const app = express();
const server = createServer(app);

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

app.get('/', (req, res) => {    
    res.send("Welcome!");
});

app.use('/api', historicalRoutes);
app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/order', placeOrderRoutes);

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Initialize WebSocket server
startWebSocketServer(server);

export default app;

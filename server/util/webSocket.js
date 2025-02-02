import { WebSocketServer } from 'ws'; 

let wss;

export const startWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server, path: "/ws" });

    console.log("WebSocket Server initialized");

    const prices = [
        { symbol: "GOLDBEES", price: 40.67 },
        { symbol: "IDEA", price: 8.466 }
    ];

    const generatePriceData = () => {
        const randomIndex = Math.floor(Math.random() * prices.length);
        const randomChange = (Math.random() - 0.5) * 2;
        prices[randomIndex].price += randomChange;

        return prices;
    };

    wss.on('connection', (ws) => {
        console.log('Client connected');

        // Send dummy price data to the frontend every 5 seconds
        const interval = setInterval(() => {
            const priceData = generatePriceData();
            ws.send(JSON.stringify(priceData));
        }, 5000);

        ws.on('close', () => {
            clearInterval(interval);
            console.log('Client disconnected');
        });
    });

    console.log('WebSocket server running...');
};

export default wss;

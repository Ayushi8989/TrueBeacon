import db from './database.js';

const getHistoricalData = async (req, res) => {
    const { symbol, from_date, to_date } = req.query;

    if (!symbol || !from_date || !to_date) {
        return res.status(400).json({ error: 'symbol, from_date, and to_date are required' });
    }

    try {
        const query = `
            SELECT date, price, instrument_name 
            FROM historical_prices 
            WHERE symbol = ? 
            AND date BETWEEN ? AND ?
            ORDER BY date ASC
        `;

        const rows = await db.all(query, [symbol, from_date, to_date]);
        res.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

export { getHistoricalData };

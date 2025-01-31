import db from '../database.js'

const getHistoricalData = async (req, res) => {
    const { symbol, from_date, to_date } = req.query;

    if (!symbol || !from_date || !to_date) {
        return res.status(400).json({ error: 'symbol, from_date, and to_date are required' });
    }

    console.log('Query Params:', { symbol, from_date, to_date });

    try {
        const query = `
            SELECT * FROM historical_prices
            WHERE symbol = ?
            AND date BETWEEN ? AND ?
        `;

        db.all(query, [symbol, from_date, to_date], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'An error occurred while fetching historical data' });
            }
            return res.status(200).json(rows);
        });
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'An error occurred while fetching historical data' });
    }
};

export { getHistoricalData };

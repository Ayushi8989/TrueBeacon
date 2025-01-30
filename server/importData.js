import fs from 'fs'
import csv from 'csv-parser'
import db from './database.js'

const CSV_FILE = 'historical_prices.csv';
const formatDate = (dateStr) => new Date(dateStr).toISOString().slice(0, 19).replace('T', ' ');

async function importCSV() {
    try {
        const records = [];

        fs.createReadStream(CSV_FILE)
            .pipe(csv())
            .on('data', (row) => {
                const { date, price, symbol } = row;

                records.push({
                    date: formatDate(date),
                    price: parseFloat(price),
                    symbol
                });
            })
            .on('end', async () => {
                console.log(`Processing ${records.length} records...`);

                db.serialize(() => {
                    const stmt = db.prepare(
                        `INSERT OR IGNORE INTO historical_prices 
                         (date, price, symbol) 
                         VALUES (?, ?, ?)`
                    );

                    records.forEach((record) => {
                        stmt.run(
                            record.date,
                            record.price,
                            record.symbol
                        );
                    });

                    stmt.finalize(() => {
                        console.log('CSV data imported successfully.');
                        db.close();
                    });
                });
            });
    } catch (error) {
        console.error('Error importing CSV:', error);
    }
}

importCSV();

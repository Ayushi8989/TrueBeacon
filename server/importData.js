import fs from 'fs';
import csv from 'csv-parser';
import db from './database.js';

const CSV_FILE = 'historical_prices.csv';
const insrow = db.prepare('INSERT INTO historical_prices(date, price, symbol) VALUES (?, ?, ?)');

async function importCSV() {
    try {
        db.serialize(() => {
            fs.createReadStream(CSV_FILE)
                .pipe(csv())
                .on('data', (row) => {
                    insrow.run(row.date.slice(0, 10), row.price, row.symbol);
                    console.log(row);
                })
                .on('end', () => {
                    insrow.finalize((err) => {
                        if (err) console.error('Finalize Error:', err);

                        db.close((err) => {
                            if (err) console.error('Close Error:', err);
                            else console.log('Database connection closed.');
                        });
                    });
                });
        });
    } catch (error) {
        console.error('Error importing CSV:', error);
    }
}

importCSV();

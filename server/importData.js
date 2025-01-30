import fs from 'fs'
import csv from 'csv-parser'
import db from './database.js'

const CSV_FILE = 'historical_prices.csv';

async function importCSV() {
    try {
        const records = [];

        fs.createReadStream(CSV_FILE)
            .pipe(csv())
            .on('data', (row) => {
                const { date, price, instrument_name } = row;

                records.push({
                    date,
                    price: parseFloat(price),
                    instrument_name
                });
            })
            .on('end', async () => {
                console.log(`Processing ${records.length} records...`);

                db.serialize(() => {
                    const stmt = db.prepare(
                        `INSERT OR IGNORE INTO historical_prices 
                         (date, price, instrument_name) 
                         VALUES (?, ?, ?)`
                    );

                    records.forEach((record) => {
                        stmt.run(
                            record.date,
                            record.price,
                            record.instrument_name
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

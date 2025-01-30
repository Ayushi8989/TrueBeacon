import sqlite3 from 'sqlite3';

const filepath = 'historical_prices.sqlite'
// Connecting to database
const db = new sqlite3.Database(filepath, (err) => {
    if (err) {
        console.log('Error openinig database: ', err.message);
    } else {
        console.log('Connected to SQLite database!');
    }
})

// Creating historical_prices table
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS historical_prices (
            date TEXT NOT NULL,
            price REAL,
            instrument_name TEXT
        )`,
        (err) => {
            if (err) console.error('Error creating table', err.message);
        }
    );
});

export default db;
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = '../server/historical_data.db'; 

// Connecting to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database!');
    }
    // db.all('SELECT * FROM historical_prices', [], (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(rows);  
    // });
});

export default db;

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize table for uploaded files
const init = () => {
  db.run(`CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    originalname TEXT NOT NULL,
    filename TEXT NOT NULL,
    mimetype TEXT NOT NULL
  )`);
};

module.exports = { db, init };

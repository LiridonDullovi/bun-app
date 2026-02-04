import { Database } from "bun:sqlite";

const db = new Database("./src/database/database.sqlite", { create: true });

db.run(`CREATE TABLE IF NOT EXISTS users 
    (id INTEGER PRIMARY KEY, 
        name STRING, 
        email STRING UNIQUE, 
        password TEXT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);

db.run(`CREATE TABLE IF NOT EXISTS posts 
    (id INTEGER PRIMARY KEY, 
        title STRING, 
        description TEXT, 
        author UNSIGNED INTEGER,
        duration INTEGER, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(author) REFERENCES users(id))`);
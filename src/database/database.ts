import { Database } from "bun:sqlite";

const db = new Database("./src/database/database.sqlite", { create: true });

db.run(`CREATE TABLE posts 
    (id INTEGER PRIMARY KEY, 
        title STRING, 
        description TEXT, 
        author STRING, 
        duration INTEGER, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default db;
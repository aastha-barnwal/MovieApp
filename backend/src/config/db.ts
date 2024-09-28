import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

// Load environment variables from .env file
dotenv.config();

const pool = createPool({
    host: process.env.DATABASE_HOST,
    port: 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
export default pool;
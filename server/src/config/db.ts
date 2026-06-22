import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

// Load environment variables (like passwords) from the .env file
dotenv.config();

/*
 * ==========================================
 * DATABASE CONNECTION POOL
 * ==========================================
 * Instead of opening and closing a new connection every single time 
 * a user makes a request (which is slow), we create a "Pool" of connections.
 * 
 * Think of it like a taxi stand: 
 * We have 10 taxis (connections) waiting. When a request comes in, it takes a taxi.
 * When the query is done, the taxi returns to the stand for the next request.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || 'inventiq',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  waitForConnections: true, // If all 10 taxis are busy, wait for one to return
  connectionLimit: 10,      // Maximum number of connections at once
  queueLimit: 0             // No limit to how many requests can wait in line
});

export default pool;

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Add this function to test the connection
const testConnection = async () => {
  let client;
  try {
    // Get a client from the pool
    client = await pool.connect();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Failed to connect to the database.');
    console.error(error);
  } finally {
    // Release the client back to the pool and end the pool
    if (client) client.release();
    // This closes all connections in the pool
    await pool.end();
  }
};

// Run the test
testConnection();

module.exports = pool;

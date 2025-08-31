// server.js

/**
 * ==========================================
 * Main entry point for the Express server
 * ==========================================
 * - Initializes Express app
 * - Configures middleware (CORS, JSON parser)
 * - Sets up route handlers
 * - Starts listening on specified port
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import route modules
const messagesRoutes = require('./routes/messages');
const usersRoutes = require('./routes/users');

// Create a new Express application instance
const app = express();

// Define the port (default to 5000 if not specified in .env)
const port = process.env.PORT || 5000;

/**
 * ==========================================
 * Middleware
 * ==========================================
 */

// Enable Cross-Origin Resource Sharing (CORS)
// Allows frontend applications running on different domains or ports to make requests to this API
app.use(cors());

// Parse incoming JSON request bodies automatically and make them available in req.body
app.use(express.json());

/**
 * ==========================================
 * Routes
 * ==========================================
 */

// Mount messages routes at /messages
// Example: GET /messages, POST /messages, etc.
app.use('/messages', messagesRoutes);

// Mount users routes at /users
// Example: POST /users/register, GET /users, etc.
app.use('/users', usersRoutes);

/**
 * ==========================================
 * Health check endpoint
 * ==========================================
 * Provides a simple response to confirm the API is running
 * Can be used for monitoring or to verify deployment
 */
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

/**
 * ==========================================
 * Start the server
 * ==========================================
 * Begins listening for incoming HTTP requests on the defined port
 */
app.listen(port, () => {
  console.log(`✅Server running at http://localhost:${port}`);
});

module.exports = app;

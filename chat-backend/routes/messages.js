// routes/messages.js

/**
 * ==========================================
 * Messages Routes Module
 * ==========================================
 * Contains CRUD endpoints for managing chat messages.
 * Handles validation, database operations, and error handling.
 */

const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const {
  createMessageSchema,
  updateMessageSchema,
} = require('../validations/messageSchemas');

/**
 * ==========================================
 * GET /messages
 * Fetch all messages
 * ==========================================
 * Retrieves all messages from the database,
 * ordered by ID in ascending order.
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err.stack);
    res.status(500).send('Server error');
  }
});

/**
 * ==========================================
 * POST /messages
 * Create a new message
 * ==========================================
 * Validates request body, inserts a new message into the database,
 * and returns the newly created message.
 * Fields: content (string), is_user (boolean, optional; defaults to true).
 */
router.post('/', async (req, res) => {
  try {
    // Validate incoming request using Yup schema
    const validatedData = await createMessageSchema.validate(req.body);
    const { content, is_user } = validatedData;

    // Insert new message into database
    const result = await pool.query(
      'INSERT INTO messages (content, is_user) VALUES ($1, $2) RETURNING *',
      [content, is_user ?? true],
    );

    res.json(result.rows[0]);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors[0] });
    }
    console.error('Error creating message:', err.stack);
    res.status(500).send('Server error');
  }
});

/**
 * ==========================================
 * PUT /messages/:id
 * Update a message by ID
 * ==========================================
 * Validates request body, updates message content in the database,
 * and returns the updated message.
 * Path param: id (message ID).
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Validate request body
    const validatedData = await updateMessageSchema.validate(req.body);
    const { content } = validatedData;

    // Update message in database
    const result = await pool.query(
      'UPDATE messages SET content = $1 WHERE id = $2 RETURNING *',
      [content, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors[0] });
    }
    console.error(`Error updating message with ID ${id}:`, err.stack);
    res.status(500).send('Server error');
  }
});

/**
 * ==========================================
 * DELETE /messages/:id
 * Delete a message by ID
 * ==========================================
 * Deletes a message from the database using the given ID,
 * and returns a success message on successful deletion.
 * Path param: id (message ID).
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM messages WHERE id = $1 RETURNING *',
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error(`Error deleting message with ID ${id}:`, err.stack);
    res.status(500).send('Server error');
  }
});

// Export router to be used in server.js
module.exports = router;

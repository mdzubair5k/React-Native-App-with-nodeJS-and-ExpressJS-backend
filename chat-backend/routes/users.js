// routes/users.js

/**
 * ==========================================
 * User Routes Module
 * ==========================================
 * Contains endpoints for user registration, login, and CRUD operations.
 * Handles authentication, password hashing, and database operations.
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/index');
const { registerSchema, loginSchema } = require('../validations/userSchemas');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

// Secret key used to sign JWT tokens (should be stored securely in production)
// const JWT_SECRET = 'your_jwt_secret_here';

/**
 * ==========================================
 * POST /users/register
 * Register a new user
 * ==========================================
 * Validates input, checks for existing email,
 * hashes password, and inserts new user into DB.
 */
router.post('/register', async (req, res) => {
  try {
    // Validate request body using Yup schema
    const validatedData = await registerSchema.validate(req.body);
    const { name, email, password } = validatedData;

    // Check if a user with this email already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword],
    );

    res.json({
      user: newUser.rows[0],
      message: 'User registered successfully',
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors[0] });
    }
    // console.error('Error registering user:', err.stack);
    res.status(500).send('Server error');
  }
});

/**
 * ==========================================
 * POST /users/login
 * Login user and return JWT token
 * ==========================================
 * Validates credentials, compares hashed password,
 * and generates JWT on success.
 */
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const validatedData = await loginSchema.validate(req.body);
    const { email, password } = validatedData;

    // Find user by email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare provided password with stored hashed password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.rows[0].id, email: user.rows[0].email },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.json({
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors[0] });
    }
    // console.error('Error logging in user:', err.stack);
    res.status(500).send('Server error');
  }
});

/**
 * ==========================================
 * GET /users
 * Fetch all users
 * ==========================================
 * Returns a list of all users (without passwords).
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email FROM users ORDER BY id ASC',
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.stack);
    res.status(500).send('Server error');
  }
});

/**
 * ==========================================
 * GET /users/:id
 * Fetch a single user by ID
 * ==========================================
 * Returns user details by given ID (without password).
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching user with ID ${id}:`, err.stack);
    res.status(500).send('Server error');
  }
});

/**
 * ==========================================
 * PUT /users/:id
 * Update user details (name and/or email)
 * ==========================================
 * Allows partial updates — keeps old value if new value not provided.
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Use provided values or fallback to existing
    const updatedName = name || user.rows[0].name;
    const updatedEmail = email || user.rows[0].email;

    // Update user in database
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [updatedName, updatedEmail, id],
    );

    res.json({ user: result.rows[0], message: 'User updated successfully' });
  } catch (err) {
    console.error(`Error updating user with ID ${id}:`, err.stack);
    res.status(500).send('Server error');
  }
});

/**
 * ==========================================
 * DELETE /users/:id
 * Delete a user by ID
 * ==========================================
 * Removes user from the database.
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(`Error deleting user with ID ${id}:`, err.stack);
    res.status(500).send('Server error');
  }
});

// Export router to be used in server.js
module.exports = router;

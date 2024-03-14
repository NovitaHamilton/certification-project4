const bcrypt = require('bcryptjs');
const express = require('express');
const User = require('../models/user');

const loginRouter = express.Router();

// Endpoint to test connection
loginRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First Login Endpoint',
  });
});

//------------------POST Endpoint----------------------//{
loginRouter.post('/', async (request, response) => {
  try {
    const { name, password } = request.body;
    // Get user and check if user exist
    const user = await User.findOne({ name });
    if (!user) {
      return response.status(401).json({ error: 'Invalid User Name' });
    }
    // Check if password correct
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return response.status(401).json({ error: 'Invalid Password' });
    }
    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = loginRouter;

// Imports
require('dotenv').config(); // environment variable
const express = require('express'); // express application
const cors = require('cors'); // Necessary for localhost
const app = express(); // Creates an express application in app
const db = require('./config/mongodb'); // database connection
const middleware = require('./utils/middleware');

// Initial application setup
app.use(cors()); // to connect to a localhost later
app.use(express.json()); // to receive requests with JSON data attached

// Establish connection with database
db.createConnection();

// Adding middleware
app.use(middleware.logger);

// Connect with DB, start server, and listen to server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = server;

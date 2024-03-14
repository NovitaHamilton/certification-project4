// Imports
require('dotenv').config(); // environment variable
const express = require('express'); // express application
const cors = require('cors'); // Necessary for localhost
const app = express(); // Creates an express application in app
const db = require('./config/mongodb'); // database connection
const middleware = require('./utils/middleware');
const tasksRouter = require('./routers/tasks');
const tasklistsRouter = require('./routers/tasklists');
const usersRouter = require('./routers/users');

// Initial application setup
app.use(cors()); // to connect to a localhost later
app.use(express.json()); // to receive requests with JSON data attached

// Establish connection with database
db.createConnection();

// Adding middleware
app.use(middleware.logger);

// Adding routers
app.use('/api/tasks/', tasksRouter); // Add tasks router
app.use('/api/tasklists/', tasklistsRouter); // Add taskslists router
app.use('/api/users', usersRouter);
// Testing endpoint connection
app.get('/', (request, response) => {
  response.status(201).send('Hello World!');
});

// Connect with DB, start server, and listen to server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = server;

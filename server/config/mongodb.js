// Getting access to env file
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Import and set up to connect with database
const mongoose = require('mongoose');
mongoose.set('strictQuery', false); //mongoose.set() method is used to set various options and configurations for the mongoose library

// To create and close connection

const createConnection = async () => {
  const databaseURL = process.env.MONGODB_URI;
  try {
    console.log(`Connecting to... ${databaseURL}`);
    await mongoose.connect(databaseURL);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

const closeConnection = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log('Error closing connection:', error);
  }
};

module.exports = { createConnection, closeConnection };

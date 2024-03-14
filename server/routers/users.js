const bcrypt = require('bcryptjs');
const express = require('express');
const Task = require('../models/task'); // import the Task model from Mongoose
const TaskList = require('../models/tasklist'); // import the TaskList model
const User = require('../models/user'); // import User model

const usersRouter = express.Router();

// Endpoint to test connection
usersRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First Users Endpoint',
  });
});

//-----------------GET Endpoint--------------------------//
usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internet Server Error' });
  }
});

//---------------------GET:id Endpoint--------------//
usersRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id; // capture the id of the request

    const user = await User.findById(id); // To find task by its id
    // Check if task was found
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    response.status(200).json(user); // To retrieve the task if found
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------POST Endpoint----------------------//
usersRouter.post('/', async (request, response) => {
  try {
    // Get data from request body
    const { name, password } = request.body;
    console.log(request.body);
    // Validate if required data exist
    if (!name || !password) {
      return response.status(400).json({ error: 'Missing required input' });
    }
    // Validate if users name already exist
    const duplicateCount = await User.countDocuments({ name }).exec();
    if (duplicateCount !== 0) {
      return response.status(400).json({ error: 'User Name is not available' });
    }
    // Perform hash
    const passwordHash = await bcrypt.hash(password, 10); // '10' represent the round of hashing
    const newUser = new User({
      name,
      passwordHash,
    });
    console.log(newUser);
    const savedUser = await newUser.save();
    // Respond with newly created user
    response.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------PUT:id Endpoint------------------------//
usersRouter.put('/:id', async (request, response) => {
  try {
    const userId = request.params.id; // Get user id
    const updatedUserDetails = request.body; // Get the updated User Details

    const userToUpdate = await User.findById(userId); // Check if user existed
    if (!userToUpdate) {
      return response.status(404).json({ error: 'User not found' });
    }

    await User.findByIdAndUpdate(userId, updatedUserDetails); // Update user with the new details

    const updatedUser = await User.findById(userId); // Fetch the updated user from the database
    response.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------DELETE:id Endpoint----------------------//
usersRouter.delete('/:id', async (request, response) => {
  try {
    // Get id
    const userId = request.params.id;

    // Check if user exist
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Get all the data need to be deleted (tasklists and tasks that belongs to the user)
    const tasklistIds = user.tasklists.map((tasklistId) => tasklistId.toJSON());
    const tasklists = await Promise.all(
      tasklistIds.map((tasklistId) => TaskList.findById(tasklistId))
    );

    const taskIds = tasklists.map((taskList) => taskList.tasks); // Get the tasks value (array of objectIds) inside each Task List, which will resulted in objects of arrays at the end, after the map iteration
    const flattenedTaskIds = taskIds.flat().map((taskId) => taskId.toJSON()); // Flatten the tasks (objects of arrays) into an object with the values from all the arrays and convert it to JSON format

    // Perform deletions to user, tasklists, & tasks
    await User.findByIdAndDelete(userId);
    await Promise.all(
      tasklistIds.map((tasklistId) => TaskList.findByIdAndDelete(tasklistId))
    );
    await Promise.all(
      flattenedTaskIds.map((taskId) => Task.findByIdAndDelete(taskId))
    );

    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = usersRouter;

const express = require('express');
const Task = require('../models/task'); // import the Task model from Mongoose
const TaskList = require('../models/tasklist'); // import the TaskList model
const User = require('../models/user'); // import User model

const tasklistsRouter = express.Router(); //creates a new router object using the Router() function provided by the Express module and assigns it to the taskRouter variable. This router object can then be used to define routes and middleware specific to the /api/... endpoint

// Endpoint to test connection
tasklistsRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First TaskList Endpoint',
  });
});

//-----------------GET Endpoint--------------------------//
tasklistsRouter.get('/', async (request, response) => {
  try {
    const tasklists = await TaskList.find({});
    response.status(200).json(tasklists);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internet Server Error' });
  }
});

//---------------------GET:id Endpoint--------------//
tasklistsRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id; // capture the id of the request

    const tasklist = await TaskList.findById(id); // To find task by its id
    // Check if task was found
    if (!tasklist) {
      return response.status(404).json({ error: 'Task List not found' });
    }
    response.status(200).json(tasklist); // To retrieve the task if found
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------POST:id Endpoint----------------------//
tasklistsRouter.post('/:id', async (request, response) => {
  try {
    // Get user id
    const userId = request.params.id;
    // Get data from request body
    const { name } = request.body;
    // Validate data
    if (!name) {
      return response.status(400).json({ error: 'Missing required input' });
    }

    // Get the user
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Create a new task list record and save it
    const newTaskList = new TaskList({ name });
    const savedTaskList = await newTaskList.save();
    // Add task list Id to the tasklists key inside user and save it
    user.tasklists = user.tasklists.concat(savedTaskList._id);
    await user.save();
    // Respond with newly created task list
    response.status(201).json(savedTaskList);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------PUT:id Endpoint------------------------//
tasklistsRouter.put('/:id', async (request, response) => {
  try {
    const taskListId = request.params.id; // Get task id
    const updatedTaskListDetails = request.body; // Get the updatedTask details

    const taskListToUpdate = await TaskList.findById(taskListId); // Check if task existed
    if (!taskListToUpdate) {
      return response.status(404).json({ error: 'Task not found' });
    }

    await TaskList.findByIdAndUpdate(taskListId, updatedTaskListDetails); // Update task with the new details

    const updatedTaskList = await TaskList.findById(taskListId); // Fetch the updated task from the database
    response.status(200).json(updatedTaskList);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------DELETE:id Endpoint----------------------//
tasklistsRouter.delete('/:id', async (request, response) => {
  try {
    // Get id
    const taskListId = request.params.id;
    const { userId } = request.body;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Check if Task List exist
    const taskList = await TaskList.findById(taskListId);
    if (!taskList) {
      return response.status(404).json({ error: 'Task List not found' });
    }

    // Remove tasklist reference from User
    user.tasklists = user.tasklists.filter(
      (tasklistId) => tasklistId.toJSON() !== taskListId
    );
    await user.save();

    // Get the tasks ids inside Task List and remove them
    const taskIds = taskList.tasks.map((taskId) => taskId.toJSON());
    await Promise.all(taskIds.map((taskId) => Task.findByIdAndDelete(taskId)));

    // Remove Task List
    await TaskList.findByIdAndDelete(taskListId);
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = tasklistsRouter;

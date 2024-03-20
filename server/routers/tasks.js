const express = require('express');
const Task = require('../models/task'); // import the Task model from Mongoose
const TaskList = require('../models/tasklist'); // import the TaskList model

const tasksRouter = express.Router(); //creates a new router object using the Router() function provided by the Express module and assigns it to the taskRouter variable. This router object can then be used to define routes and middleware specific to the /api/... endpoint

// Endpoint to test connection
tasksRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First TaskList Endpoint',
  });
});

//-----------------GET Endpoint--------------------------//
tasksRouter.get('/', async (request, response) => {
  try {
    const tasks = await Task.find({});
    response.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internet Server Error' });
  }
});

//---------------------GET:id Endpoint--------------//
tasksRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id; // capture the id of the request

    const task = await Task.findById(id); // To find task by its id
    // Check if task was found
    if (!task) {
      return response.status(404).json({ error: 'Task not found' });
    }
    response.status(200).json(task); // To retrieve the task if found
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------POST:id Endpoint----------------------//
// POST request to /:id. The :id required is of the Task List where the Task is belong to

tasksRouter.post('/:id', async (request, response) => {
  console.log('Request Body:', request.body);
  const taskListId = request.params.id;
  try {
    // Get data from the request body
    const content = request.body;
    // Validate the data
    for (const key in content)
      if (!content[key]) {
        return response
          .status(400)
          .json({ error: `Missing required input: ${key}` });
      }
    // Get Task List
    const taskList = await TaskList.findById(taskListId);
    if (!taskList) {
      return response.status(404).json({ error: 'Task List not found' });
    }
    // Create a new task record and save it
    const newTask = new Task(content);
    const savedTask = await newTask.save();
    // Add Task to Task List and save it
    taskList.tasks = taskList.tasks.concat(savedTask._id); // adding the newTask id to the tasks array
    await taskList.save();
    // Response with newly created task
    response.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------PUT:id Endpoint------------------------//
tasksRouter.put('/:id', async (request, response) => {
  try {
    const taskId = request.params.id; // Get task id
    const updatedTaskDetails = request.body; // Get the updatedTask details

    const taskToUpdate = await Task.findById(taskId); // Check if task existed
    if (!taskToUpdate) {
      return response.status(404).json({ error: 'Task not found' });
    }

    await Task.findByIdAndUpdate(taskId, updatedTaskDetails); // Update task with the new details

    const updatedTask = await Task.findById(taskId); // Fetch the updated task from the database
    response.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//------------------DELETE:id Endpoint----------------------//

tasksRouter.delete('/:id', async (request, response) => {
  try {
    // Get id
    const taskId = request.params.id;
    const { taskListId } = request.body;

    // Check if Task List exist
    const taskList = await TaskList.findById(taskListId);
    if (!taskList) {
      return response
        .status(404)
        .json({ error: 'Task List not found to remove task from' });
    }

    // Remove the task and it's reference to the Task List
    const taskToDelete = await Task.findByIdAndDelete(taskId);
    if (!taskToDelete) {
      return response.status(404).json({ error: 'Task not found' });
    }
    taskList.tasks = taskList.tasks.filter((id) => id.toJSON() !== taskId);
    await taskList.save();
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = tasksRouter;

const Task = require('../models/task');

const initialTasks = [
  {
    name: 'Test Task 1',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-03-27T00:00:00.000+00:00',
  },
  {
    name: 'Test Task 2',
    priority: 'High',
    status: 'To Do',
    dueDate: '2024-03-28T00:00:00.000+00:00',
  },
];

// Returns all currencies from the DB table
const tasksInDb = async () => {
  const tasks = await Task.find({});
  return tasks.map((task) => task.toJSON());
};

// Perform a bulk write
const load = async () => {
  await Task.insertMany(initialTasks);
};

// Clears all test tables in the database
const clearData = async () => {
  await Task.deleteMany({});
};

module.exports = {
  initialTasks,
  tasksInDb,
  load,
  clearData,
};

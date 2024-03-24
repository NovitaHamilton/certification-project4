const TaskList = require('../models/tasklist');

const initialTasklists = [
  {
    name: 'Task List 1',
    tasks: [],
  },
  {
    name: 'Task List 2',
    tasks: [],
  },
];

// Returns all currencies from the DB table
const tasklistsInDb = async () => {
  const tasklists = await TaskList.find({});
  return tasklists.map((tasklist) => tasklist.toJSON());
};

// Perform a bulk write
const load = async () => {
  await TaskList.insertMany(initialTasklists);
};

// Clears all test tables in the database
const clearData = async () => {
  await TaskList.deleteMany({});
};

module.exports = {
  initialTasklists,
  tasklistsInDb,
  load,
  clearData,
};

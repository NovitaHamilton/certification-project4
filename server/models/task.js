const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  priority: String,
  status: String,
  dueDate: Date,
});

// To transform the format of the object returned by schema into specific format defined here
taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // turning ObjectId format into String format
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

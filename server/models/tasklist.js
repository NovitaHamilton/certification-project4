const mongoose = require('mongoose');

const tasklistSchema = new mongoose.Schema({
  name: String,
  tasks: [
    // this will contains an array of objectId objects which reference to Task model
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

// To transform the format of the object returned by schema into specific format defined here
tasklistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // store ojectId and format it into String
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const TaskList = mongoose.model('TaskList', tasklistSchema);

module.exports = TaskList;

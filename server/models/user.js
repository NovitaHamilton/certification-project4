const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  passwordHash: String,
  tasklists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaskList',
    },
  ],
});

// To transform the format of the object returned by schema into specific format defined here
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // store ojectId and format it into String
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // password hash should not be returned
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

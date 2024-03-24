const User = require('../models/user');

const initialUsers = [
  {
    name: 'test',
    passwordHash:
      '$2a$10$KpO53hpP4J6xQb4VmE02oORybp404/gDhkDXHt5Ow37PG4Cob1YUq',
    tasklists: [],
  },
  {
    name: 'Gavin H',
    passwordHash:
      '$2a$10$zQmFxNgNZsW0Wo8L08Hs8ucBB8xmtnGIAtIXiv4oVkglJVPxTAr0.',
    tasklists: [],
  },
];

// Returns all currencies from the DB table
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

// Perform a bulk write
const load = async () => {
  await User.insertMany(initialUsers);
};

// Clears all test tables in the database
const clearData = async () => {
  await User.deleteMany({});
};

module.exports = {
  initialUsers,
  usersInDb,
  load,
  clearData,
};

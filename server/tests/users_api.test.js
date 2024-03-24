const supertest = require('supertest');
const helper = require('./users_test_helper');
const server = require('../server');
const api = supertest(server); // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Clear data and load new entries for tests
  await helper.clearUsers();
  await helper.loadUsers();
});

afterAll((done) => {
  server.close(done); // Close the server instance after all tests have finished
});

describe('GET tests', () => {
  test('We have 2 users at the start', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });

  test('Getting a specific user based on id', async () => {
    const users = await helper.usersInDb();
    const userId = users[0].id;

    const response = await api.get(`/api/users/${userId}`).expect(200);

    const userReceived = response.body;
    expect(userReceived.name).toEqual(helper.initialUsers[0].name);
  });
});

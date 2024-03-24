const supertest = require('supertest');
const helper = require('./tasklists_test_helper');
const server = require('../server');
const api = supertest(server); // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Clear data and load new entries for tests
  await helper.clearData();
  await helper.load();
});

afterAll((done) => {
  server.close(done); // Close the server instance after all tests have finished
});

describe('GET tests', () => {
  test('We have 2 tasklists at the start', async () => {
    const response = await api.get('/api/tasklists');
    expect(response.body).toHaveLength(helper.initialTasklists.length);
  });

  test('Getting a specific tasklist based on id', async () => {
    const tasklists = await helper.tasklistsInDb();
    const taskListId = tasklists[0].id;

    const response = await api.get(`/api/tasklists/${taskListId}`).expect(200);

    const tasklistReceived = response.body;
    expect(tasklistReceived.name).toEqual(helper.initialTasklists[0].name);
  });
});

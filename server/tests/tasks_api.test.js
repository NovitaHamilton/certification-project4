const supertest = require('supertest');
const helper = require('./tasks_test_helper');
const server = require('../server');
const api = supertest(server); // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Clear data and load new entries for tests
  await helper.clearTasks();
  await helper.loadTasks();
});

afterAll((done) => {
  server.close(done); // Close the server instance after all tests have finished
});

describe('GET tests', () => {
  test('We have 2 tasks at the start', async () => {
    const response = await api.get('/api/tasks');
    expect(response.body).toHaveLength(helper.initialTasks.length);
  });

  test('Getting a specific task based on id', async () => {
    const tasks = await helper.tasksInDb();
    const taskId = tasks[0].id;

    const response = await api.get(`/api/tasks/${taskId}`).expect(200);

    const taskReceived = response.body;
    expect(taskReceived.name).toEqual(helper.initialTasks[0].name);
  });
});

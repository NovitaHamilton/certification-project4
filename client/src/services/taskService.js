import axios from 'axios';
const baseURL = '/api/tasks';

const getTasks = async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

const getTask = async (taskId) => {
  try {
    const response = await axios.get(`${baseURL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

const addTask = async (taskListId, newTask) => {
  try {
    const response = await axios.post(`${baseURL}/${taskListId}`, newTask);
    return response.data;
  } catch (error) {
    console.error('Error adding tasklist:', error);
    throw error;
  }
};

const updateTask = async (updatedTask) => {
  try {
    const response = await axios.put(
      `${baseURL}/${updatedTask.id}`,
      updatedTask
    );
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

const deleteTask = async (taskId, taskListId) => {
  try {
    const response = await axios.post(`${baseURL}/${taskId}`, taskListId);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export { getTasks, getTask, addTask, updateTask, deleteTask };

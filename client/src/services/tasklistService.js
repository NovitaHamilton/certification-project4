import axios from 'axios';
const baseURL = '/api/tasklists';

const getTaskLists = async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasklists:', error);
    throw error;
  }
};

const getTaskList = async (taskListId) => {
  try {
    const response = await axios.get(`${baseURL}/${taskListId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasklist:', error);
    throw error;
  }
};

const addTaskList = async (userId, newTaskList) => {
  try {
    const response = await axios.post(`${baseURL}/${userId}`, newTaskList);
    return response.data;
  } catch (error) {
    console.error('Error adding tasklist:', error);
    throw error;
  }
};

const updateTaskList = async (taskListId, updatedTaskList) => {
  try {
    const response = await axios.post(
      `${baseURL}/${taskListId}`,
      updatedTaskList
    );
    return response.data;
  } catch (error) {
    console.error('Error updating tasklist:', error);
    throw error;
  }
};

const deleteTaskList = async (taskListId, userId) => {
  try {
    const response = await axios.post(`${baseURL}/${taskListId}`, userId);
    return response.data;
  } catch (error) {
    console.error('Error deleting tasklist:', error);
    throw error;
  }
};

export {
  getTaskLists,
  getTaskList,
  addTaskList,
  updateTaskList,
  deleteTaskList,
};

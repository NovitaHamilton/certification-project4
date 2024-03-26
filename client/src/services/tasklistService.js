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
    const response = await axios.get(
      `https://task-manager-yvd3.onrender.com/api/tasklists/${taskListId}`
    );
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

const updateTaskList = async (taskListId, editedName) => {
  try {
    const response = await axios.put(`${baseURL}/${taskListId}`, {
      name: editedName,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating tasklist:', error);
    throw error;
  }
};

const deleteTaskList = async (userId, taskListId) => {
  try {
    const response = await axios.delete(`${baseURL}/${taskListId}`, {
      data: { userId },
    });
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

import axios from 'axios';
const baseURL = '/api/users';

const getUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const addUser = async (newUser) => {
  try {
    const response = await axios.post(`${baseURL}`, newUser);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

const updateUser = async (userId, updatedUser) => {
  try {
    const response = await axios.post(`${baseURL}/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.post(`${baseURL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
export default {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};

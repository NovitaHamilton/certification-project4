import { createSlice } from '@reduxjs/toolkit';
import {
  addTask,
  updateTask,
  getTask,
  deleteTask,
} from '../services/taskService';
import { getTaskList } from '../services/tasklistService';

const initialState = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCase(state, action) {
      return action.payload;
    },
    addCase(state, action) {
      state.push(action.payload);
    },
    editCase(state, action) {
      const updatedTask = action.payload;
      return state.map((task) => {
        if (task.id === updatedTask.id) {
          return { ...task, ...updatedTask };
        }
        return task;
      });
    },

    deleteCase(state, action) {
      return state.filter((task) => task.id !== action.payload);
    },
    loadLocalStorage(state, action) {
      return action.payload;
    },
  },
});

// Export actions
export const { setCase, addCase, editCase, deleteCase } = tasksSlice.actions;

export const initTask = (taskListId) => {
  return async (dispatch) => {
    const taskIds = (await getTaskList(taskListId)).tasks;
    const tasks = await Promise.all(taskIds.map((taskId) => getTask(taskId)));
    dispatch(setCase(tasks));
  };
};

export const addTaskAction = (taskListId, task) => {
  return async (dispatch) => {
    const newTask = await addTask(taskListId, task);
    dispatch(addCase(newTask));
  };
};

export const editTaskAction = (task) => {
  return async (dispatch) => {
    const updatedTask = await updateTask(task);
    dispatch(editCase(updatedTask));
  };
};

export const deleteTaskAction = (taskId, taskListId) => {
  console.log('From deleteTaskAction:', taskListId, taskId);
  return async (dispatch) => {
    await deleteTask(taskId, taskListId);
    dispatch(deleteCase(taskId));
  };
};
// Export reducers
export default tasksSlice.reducer;

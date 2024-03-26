import { createSlice } from '@reduxjs/toolkit';
import {
  addTaskList,
  getTaskList,
  deleteTaskList,
  updateTaskList,
} from '../services/tasklistService';
import { getUser } from '../services/userService';

const initialState = [];

const tasklistsSlice = createSlice({
  name: 'tasklists',
  initialState,
  reducers: {
    setCase(state, action) {
      return action.payload;
    },
    addCase(state, action) {
      state.push(action.payload);
    },
    editCase(state, action) {
      // initially used the destructuring method below (same with the other reducers) but for some reason it's causing issue, taskListId becomes undefined. Worked around it by accessing the value directly from action.payload
      // const { taskListId, newTask } = action.payload;
      return state.map((tasklist) => {
        if (tasklist.id === action.payload.id) {
          return { ...tasklist, name: action.payload.name };
        }
        return tasklist;
      });
    },
    deleteCase(state, action) {
      return state.filter((tasklist) => tasklist.id !== action.payload);
    },
    loadLocalStorage(state, action) {
      return action.payload;
    },
  },
});

// Export actions
export const { setCase, editCase, deleteCase, loadLocalStorage, addCase } =
  tasklistsSlice.actions;

// Redux-thunk action that initializes baskets (on login)
export const initTaskLists = (userId) => {
  return async (dispatch) => {
    try {
      const user = await getUser(userId);
      if (!user || !user.tasklists) {
        // Handle case where user or tasklists are empty
        return;
      }
      const taskListIds = user.tasklists;
      const tasklists = await Promise.all(
        taskListIds.map((taskListId) => getTaskList(taskListId))
      );
      dispatch(setCase(tasklists));
    } catch (error) {
      console.error('Error initializing task lists:', error);
    }
  };
};

// Redux-thunk action to add new task list
export const addTasklist = (userId, taskList) => {
  return async (dispatch) => {
    const newTaskList = await addTaskList(userId, taskList);
    dispatch(addCase(newTaskList));
    return newTaskList;
  };
};

// Redux-thunk action to edit task list
export const editTasklist = (taskListId, editedName) => {
  console.log(editedName);
  return async (dispatch) => {
    const updatedTaskList = await updateTaskList(taskListId, editedName);
    dispatch(editCase(updatedTaskList));
  };
};

// Redux-thunk action to delete task list
export const deleteTasklist = (userId, taskListId) => {
  return async (dispatch) => {
    await deleteTaskList(userId, taskListId);
    dispatch(deleteCase(taskListId));
  };
};

// Export reducers
export default tasklistsSlice.reducer;

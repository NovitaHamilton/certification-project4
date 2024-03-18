import { createSlice } from '@reduxjs/toolkit';
import { addTaskList } from '../services/tasklistService';

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
          return { ...tasklist, name: action.payload.editedName };
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

export const addTasklist = (userId, taskList) => {
  return async (dispatch) => {
    const newTaskList = await addTaskList(userId, taskList);
    dispatch(addCase(newTaskList));
    return newTaskList;
  };
};

// Export reducers
export default tasklistsSlice.reducer;

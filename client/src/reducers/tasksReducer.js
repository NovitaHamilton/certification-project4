import { createSlice } from '@reduxjs/toolkit';
import { addTask, updateTask, getTask } from '../services/taskService';
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
      const { taskListId, taskId } = action.payload;
      const taskListToUpdate = state.find(
        (tasklist) => tasklist.id === taskListId
      );
      if (taskListToUpdate) {
        taskListToUpdate.tasks = taskListToUpdate.tasks.filter(
          (task) => task.id !== taskId
        );
      }
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
// Export reducers
export default tasksSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const { taskListId, newTask } = action.payload;
      const taskListToUpdate = state.find(
        (tasklist) => tasklist.id === taskListId
      );
      if (taskListToUpdate) {
        taskListToUpdate.tasks.push(newTask);
      }
    },
    editTask(state, action) {
      const { taskListId, newTask } = action.payload;
      return state.map((tasklist) => {
        if (tasklist.id === taskListId) {
          return {
            ...tasklist,
            tasks: tasklist.tasks.map((task) =>
              task.id === newTask.id ? newTask : task
            ),
          };
        }
        return tasklist;
      });
    },

    deleteTask(state, action) {
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
export const { addTask, editTask, deleteTask } = tasksSlice.actions;

// Export reducers
export default tasksSlice.reducer;

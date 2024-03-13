import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    name: 'Certification Project 4 - CIC',
    tasks: [
      {
        id: '1',
        name: 'Create Wireframe',
        priority: 'Medium',
        dueDate: '2024-03-05',
        status: 'Completed',
      },
      {
        id: '2',
        name: 'Create Flow Chart',
        priority: 'Medium',
        dueDate: '2024-03-05',
        status: 'Completed',
      },
      {
        id: '3',
        name: 'Create Component Tree',
        priority: 'Medium',
        dueDate: '2024-03-06',
        status: 'In progress',
      },
    ],
  },
  {
    id: '2',
    name: 'Miniproject',
    tasks: [
      {
        id: '1',
        name: 'Part 1',
        priority: 'Medium',
        dueDate: '2024-03-01',
        status: 'Completed',
      },
      {
        id: '2',
        name: 'Part 2',
        priority: 'Medium',
        dueDate: '2024-03-01',
        status: 'Completed',
      },
    ],
  },
];

const tasklistsSlice = createSlice({
  name: 'tasklists',
  initialState,
  reducers: {
    addTaskList(state, action) {
      state.push(action.payload); // Add the new task list to the state
    },
    editTaskList(state, action) {
      console.log('Action Type:', action.type);
      console.log('Action Payload:', action.payload);

      // initially used the destructuring method below (same with the other reducers) but for some reason it's causing issue, taskListId becomes undefined. Worked around it by accessing the value directly from action.payload
      // const { taskListId, newTask } = action.payload;
      return state.map((tasklist) => {
        if (tasklist.id === action.payload.id) {
          return { ...tasklist, name: action.payload.editedName };
        }
        return tasklist;
      });
    },
    deleteTaskList(state, action) {
      return state.filter((tasklist) => tasklist.id !== action.payload);
    },

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
export const {
  addTaskList,
  editTaskList,
  deleteTaskList,
  addTask,
  editTask,
  deleteTask,
  loadLocalStorage,
} = tasklistsSlice.actions;

// Export reducers
export default tasklistsSlice.reducer;

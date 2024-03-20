import { configureStore } from '@reduxjs/toolkit';

// Importing reducers
import tasklistsReducer from './reducers/tasklistsReducer';
import userReducer from './reducers/userReducer';
import tasksReducer from './reducers/tasksReducer';

// Creating the store w/reducers
const store = configureStore({
  reducer: {
    tasklists: tasklistsReducer,
    tasks: tasksReducer,
    user: userReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';

// Importing reducers
import tasklistsReducer from './reducers/tasklistsReducer';

// Creating the store w/reducers
const store = configureStore({
  reducer: {
    tasklists: tasklistsReducer,
  },
});

export default store;

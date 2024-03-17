import { configureStore } from '@reduxjs/toolkit';

// Importing reducers
import tasklistsReducer from './reducers/tasklistsReducer';
import userReducer from './reducers/userReducer';

// Creating the store w/reducers
const store = configureStore({
  reducer: {
    tasklists: tasklistsReducer,
    user: userReducer,
  },
});

export default store;

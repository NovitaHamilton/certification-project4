import { createSlice } from '@reduxjs/toolkit';

import login from '../services/loginService';
import { addUser } from '../services/userService';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

// Export actions
export const { setUser } = userSlice.actions;

// Redux-thunk action to perform login and update store
export const loginUser = (user) => {
  return async (dispatch) => {
    const loginUser = await login(user);
    dispatch(setUser(loginUser));
  };
};

// Redux-thunk action to perform create new user
export const createUser = (user) => {
  return async (dispatch) => {
    const newUser = await addUser(user);
    dispatch(setUser(newUser));
  };
};

// // Redux-thunk action to perform logout

// Export reducers
export default userSlice.reducer;

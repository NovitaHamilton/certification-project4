import { createSlice } from '@reduxjs/toolkit';

import login from '../services/loginService';
import { addUser } from '../services/userService';
import { storeUser, removeUser, getUser } from '../services/browserService';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    emptyUser(state, action) {
      return null;
    },
  },
});

// Export actions
export const { setUser, emptyUser } = userSlice.actions;

// Redux-thunk action to perform login and update store
export const loginUser = (user) => {
  return async (dispatch) => {
    const loginUser = await login(user);
    dispatch(setUser(loginUser));
    storeUser(loginUser); // Store cookie to localStorage
  };
};

// Redux-thunk action to perform create new user
export const createUser = (user) => {
  return async (dispatch) => {
    const newUser = await addUser(user);
    dispatch(setUser(newUser));
  };
};

// Redux-thunk action to perform logout
export const logoutUser = (user) => {
  return async (dispatch) => {
    removeUser();
    dispatch(emptyUser());
  };
};

// Redux-thunk action to perform page load
export const pageLoad = () => {
  return async (dispatch) => {
    const storedUser = await getUser();
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  };
};

// Export reducers
export default userSlice.reducer;

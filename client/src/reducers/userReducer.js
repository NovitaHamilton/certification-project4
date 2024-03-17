import { createSlice } from '@reduxjs/toolkit';

import login from '../services/loginService';

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

// export const loginUser = createAsyncThunk('');

// Export reducers
export default userSlice.reducer;

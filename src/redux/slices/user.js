import { createSlice } from '@reduxjs/toolkit';
import { cookies } from "../../storage";

const initialState = {
  auth: {
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  },
  info: {
    real_name: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = {
        ...state.auth,
        ...action.payload,
      }
    },
    setInfo(state, action) {
      state.info = {
        ...state.info,
        ...action.payload,
      }
      localStorage.setItem('user', JSON.stringify(state.info));
    },
    loadInfo(state, action) {
      state.info = JSON.parse(localStorage.getItem('user'));
    }
  },
});

export const logout = () => async dispatch => {
  console.log('logout');
  dispatch(userSlice.actions.setAuth({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  }));
  dispatch(userSlice.actions.setInfo({}));
  cookies.remove('accessToken');
  cookies.remove('refreshToken');
}

export default userSlice;
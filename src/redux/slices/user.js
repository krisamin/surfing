import { createSlice } from '@reduxjs/toolkit';
import { apiUrl } from "@provider/axios";
import axios from 'axios';

const initialState = {
  loaded: false,
  auth: {
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  },
  info: {
    real_name: null,
    role: null,
  },
  submit: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitial(state, action) {
      state.auth = initialState.auth;
      state.info = initialState.info;
      state.submit = initialState.submit;
      localStorage.removeItem('user_info');
    },
    setLoaded(state, action) {
      state.loaded = action.payload;
    },
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
      localStorage.setItem('user_info', JSON.stringify(state.info));
    },
    loadInfo(state, action) {
      state.info = JSON.parse(localStorage.getItem('user_info'));
    },
    setSubmit(state, action) {
      state.submit = action.payload;
    }
  },
});

export const logout = () => async dispatch => {
  console.log('logout');
  try {
    const result = await axios({
      method: 'GET',
      url: apiUrl + 'auth/logout',
      params: {
        refresh_token: localStorage.getItem('refreshToken'),
      },
    });
    console.log(result.data);
  } catch (e) {
    console.log(e);
  }
  dispatch(userSlice.actions.setAuth({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  }));
  dispatch(userSlice.actions.setInitial());
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export default userSlice;
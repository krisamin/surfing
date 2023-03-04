import React from 'react';
import axios from 'axios';

import { useDispatch } from "react-redux";
import userSlice, { logout } from "../redux/slices/user";
import { cookies } from "../storage";
const AxiosContext = React.createContext();
const { Provider } = AxiosContext;

const apiUrl = 'https://dev-api-surfing.pentag.kr/';

const AxiosProvider = ({ children }) => {
  const dispatch = useDispatch();
  const publicAxios = axios.create({
    baseURL: apiUrl,
    //timeout: 1000,
  });

  const authAxios = axios.create({
    baseURL: apiUrl,
    //timeout: 1000,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${cookies.get('accessToken')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await refreshAccessToken();

        cookies.set('accessToken', newAccessToken);
        dispatch(userSlice.actions.setAuth({
          accessToken: newAccessToken
        }));

        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return authAxios(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  const refreshAccessToken = async () =>
    axios({
      method: 'GET',
      params: {
        refresh_token: cookies.get('refreshToken'),
      },
      url: apiUrl + 'auth/refresh',
    })
      .then(tokenRefreshResponse => tokenRefreshResponse.data.access_token)
      .catch(error => {
        console.log("refreshAccessToken error");
        logout();
        return Promise.reject();
      });
    /*cookies.set('accessToken', result.data.access_token);
    cookies.set('refreshToken', result.data.refresh_token);
    dispatch(userSlice.actions.setAuth({
      accessToken: result.data.access_token,
      refreshToken: result.data.refresh_token,
      authenticated: true,
    }));*/

  return (
    <Provider value={{ publicAxios, authAxios }}>
      {children}
    </Provider>
  )
}

export { AxiosContext, AxiosProvider };
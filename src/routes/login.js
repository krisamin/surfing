import React from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

import '../style/circle.scss';
import { cookies } from "../storage";

import { useSelector, useDispatch } from 'react-redux';
import { AxiosContext } from "../provider/axios";
import userSlice from "../redux/slices/user";

const Circle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicAxios } = React.useContext(AxiosContext);
  const { authenticated } = useSelector(state => state.user.auth);

  React.useEffect(() => {
    if (authenticated) {
      navigate('/circle');
    }
  }, [navigate, authenticated]);

  const login = async () => {
    try {
      const result = await publicAxios.post('/auth/login', {
        username: $('#username').val(),
        password: $('#password').val(),
      });
      console.log(result);
      cookies.set('accessToken', result.data.access_token);
      cookies.set('refreshToken', result.data.refresh_token);
      dispatch(userSlice.actions.setAuth({
        accessToken: result.data.access_token,
        refreshToken: result.data.refresh_token,
        authenticated: true,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="page" className="login">
      <input id="username" type="text" />
      <input id="password" type="password" />
      <button onClick={ login }>로그인</button>
    </div>
  );
}

export default Circle;
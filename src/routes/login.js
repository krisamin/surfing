import React from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

import Loading from "@components/loading";

import { useSelector, useDispatch } from 'react-redux';
import { AxiosContext } from "@provider/axios";
import userSlice from "@redux/slices/user";

import '@styles/login.scss';
const Circle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicAxios } = React.useContext(AxiosContext);
  const { authenticated } = useSelector(state => state.user.auth);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [warning, setWarning] = React.useState(false);

  React.useEffect(() => {
    if (authenticated) {
      navigate('/circle', { replace: true });
    }
  }, [navigate, authenticated]);

  const [loading, setLoading] = React.useState(false);
  const login = async () => {
    if (username === '' || password === '') return;
    setLoading(true);
    try {
      const result = await publicAxios.post('/auth/login', {
        username,
        password,
      });
      console.log(result);
      localStorage.setItem('accessToken', result.data.access_token);
      localStorage.setItem('refreshToken', result.data.refresh_token);
      dispatch(userSlice.actions.setAuth({
        accessToken: result.data.access_token,
        refreshToken: result.data.refresh_token,
        authenticated: true,
      }));
    } catch (e) {
      console.log(e);
      setWarning(true);
    }
    setLoading(false);
  };

  return (
    <div id="page" className="login">
      <Loading visible={ loading } />
      <p id="title">로그인</p>
      <p id="subtitle" className={ warning ? "warning" : "" }>{ warning ? '아이디나 비밀번호가 틀렸습니다.' : '디미고인 아이디로 로그인 해주세요.' }</p>
      <div id="input" className="username">
        <p id="placeholder">아이디</p>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              $('#password').trigger("focus");
            }
          }}
        />
      </div>
      <div id="input" className="password">
        <p id="placeholder">비밀번호</p>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              login();
            }
          }}
        />
      </div>
      <div id="login" onClick={login}>
        로그인
      </div>
    </div>
  );
}

export default Circle;
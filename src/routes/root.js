import React from "react";
import $ from 'jquery';
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import { useSelector, useDispatch } from "react-redux";
import { AxiosContext } from "../provider/axios";
import userSlice from "../redux/slices/user";
import circleSlice from "../redux/slices/circle";

const Root = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authAxios } = React.useContext(AxiosContext);
  const { authenticated } = useSelector(state => state.user.auth);

  const loadJWT = React.useCallback(async () => {
    const [accessToken, refreshToken] = [
      localStorage.getItem('accessToken'),
      localStorage.getItem('refreshToken'),
    ];
    if (accessToken && refreshToken) {
      dispatch(userSlice.actions.setAuth({
        accessToken,
        refreshToken,
        authenticated: true,
      }));
    } else {
      console.log("No JWT");
    }
  }, [dispatch]);

  React.useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  const loadInfo = React.useCallback(async () => {
    dispatch(userSlice.actions.loadInfo());
    const result = await authAxios.get('/auth/me');
    dispatch(userSlice.actions.setInfo(result.data));
    dispatch(userSlice.actions.setLoaded(true));
    console.log(result.data);
  }, [authAxios, dispatch]);

  const getUserSubmit = React.useCallback(async () => {
    const result = await authAxios.get('/submit');
    console.log(result.data);
    dispatch(userSlice.actions.setSubmit(result.data.submit_list));
  }, [authAxios, dispatch]);

  const getPeriod = React.useCallback(async () => {
    const result = await authAxios.get('/period/current');
    console.log(result.data);
    dispatch(circleSlice.actions.setPeriod(result.data.message));
  }, [authAxios, dispatch]);

  React.useEffect(() => {
    if (authenticated) {
      loadInfo();
    }
  }, [authenticated, loadInfo, getUserSubmit, getPeriod]);

  React.useEffect(() => {
    $('#root').scrollTop(0);
    getPeriod();
    if (authenticated) {
      getUserSubmit();
    }
  }, [location, authenticated, getUserSubmit, getPeriod]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
};

export default Root;
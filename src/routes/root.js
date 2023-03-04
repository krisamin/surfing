import React from "react";
import $ from 'jquery';
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import { useSelector, useDispatch } from "react-redux";
import { AxiosContext } from "../provider/axios";
import userSlice from "../redux/slices/user";
import { cookies } from "../storage";

const Root = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authAxios } = React.useContext(AxiosContext);
  const { authenticated } = useSelector(state => state.user.auth);

  const loadJWT = () => {
    const [accessToken, refreshToken] = [
      cookies.get("accessToken"),
      cookies.get("refreshToken"),
    ];
    if (accessToken && refreshToken) {
      dispatch(userSlice.actions.setAuth({
        accessToken,
        refreshToken,
        authenticated: true,
      }));
      dispatch(userSlice.actions.loadInfo());
    } else {
      console.log("No JWT");
    }
  };

  const loadInfo = async () => {
    const result = await authAxios.get('/auth/me');
    dispatch(userSlice.actions.setInfo(result.data));
  }

  React.useEffect(() => {
    loadJWT();
  }, []);

  React.useEffect(() => {
    $('#root').scrollTop(0);
  }, [location]);

  React.useEffect(() => {
    if (authenticated) {
      loadInfo();
    }
  }, [authenticated]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
};

export default Root;
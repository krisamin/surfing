import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

import '../style/navbar.scss';

import { ReactComponent as LogoDark } from '../assets/surfing.dark.svg';
import { ReactComponent as LogoLight } from '../assets/surfing.light.svg';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/slices/user";
import circleSlice from "../redux/slices/circle";

const Navbar = () => {
  const location = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.user.auth);
  const { info } = useSelector(state => state.user);
  const { search/*, period*/ } = useSelector(state => state.circle);

  return (
    <div id="navbar" className={location === "" ? "" : "glass"}>
      <div id="inner">
        <Link to={"/"} id="logo">
          {location === "" ? <LogoLight /> : <LogoDark />}
        </Link>
        <div id="search">
          <input
            placeholder="동아리 검색하기"
            onFocus={() => {
              navigate("/circle");
            }}
            value={search || ""}
            onChange={(e) => {
              dispatch(circleSlice.actions.setSearch(e.target.value));
            }}
          />
        </div>
        <div id="items">
          <Link
            id="item"
            to={"/circle"}
            className={location === "circle" ? "selected" : ""}
          >
            동아리 목록
          </Link>
          {["CIRCLE_ADMIN", "CIRCLE_VICE_ADMIN"].indexOf(info?.role) !== -1 && (
            <Link
              id="item"
              to={"/admin"}
              className={location === "admin" ? "selected" : ""}
            >
              신청 관리
            </Link>
          )}
          {/*period && !["PREPARING", "EOL"].includes(period)*/ true && (
            authenticated ? (
              <div id="item" onClick={() => dispatch(logout())}>
                {info?.real_name} 님
              </div>
            ) : (
              <Link
                id="item"
                to={"/login"}
                className={location === "login" ? "selected" : ""}
              >
                로그인
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
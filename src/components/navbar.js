import React from 'react';
import { Link, useLocation } from "react-router-dom";

import '../style/navbar.scss';

import { ReactComponent as LogoDark } from '../assets/surfing.dark.svg';
import { ReactComponent as LogoLight } from '../assets/surfing.light.svg';

import { useSelector, useDispatch } from 'react-redux';
import userSlice, { logout } from "../redux/slices/user";

const Navbar = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.user.auth);
  const { info } = useSelector(state => state.user);
  const location = useLocation().pathname.split('/')[1];

  return (
    <div id="navbar" className={ location === "" ? "" : "glass" }>
      <div id="inner">
        <Link to={ "/" } id="logo">
          { location === "" ? <LogoLight /> : <LogoDark />}
        </Link>
        <div id='search'>
          <input placeholder='동아리 검색하기' />
        </div>
        <div id='items'>
          <Link id='item' to={ "/circle" }>동아리 목록</Link>
          { authenticated ? <div id="item" onClick={() => dispatch(logout())}>{info.real_name} 님</div> : <Link id='item' to={ "/login" }>로그인</Link> }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
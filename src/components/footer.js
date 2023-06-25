import React from 'react';
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as LogoDark } from '@assets/surfing.footer.dark.svg';
import { ReactComponent as LogoLight } from '@assets/surfing.footer.light.svg';

import '@styles/footer.scss';
const Footer = () => {
  const location = useLocation().pathname.split('/')[1];

  return (
    <div id="footer" className={ location === "" ? "" : "glass" }>
      <div id="inner">
        <Link to={ "/" } id="about">
          { location === "" ? <LogoLight /> : <LogoDark />}
          <p>제 1 회 한국디지털미디어고등학교 동아리 전시회</p>
        </Link>
        <div id="item">
          <p id="key">주관 & 운영</p>
          <p id="value">DIN, 디미고 인트라넷 개발팀</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
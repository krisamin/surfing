import React from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';

import { useParams } from "react-router-dom";

import { ReactComponent as BackSvg } from '../assets/back.svg';

import circles from '../data/circles.json';

import '../style/detail.scss';
const Circle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [info, setInfo] = React.useState(null);

  React.useEffect(() => {
    if(circles[id - 1] == null) {
      navigate('/circle');
    } else {
      setInfo(circles[id - 1]);
    }
  });


  return info ? (
    <div id="page" className="detail">
      <div id="header">
        <Link to={ "/circle" } id="back"><BackSvg /></Link>
        <div id="logo"></div>
        <div id="info">
          <div id="top">
            <p id="name">{ info.name }</p>
            <div id="links">
              <div id="link">i</div>
              <div id="link">i</div>
            </div>
          </div>
          <div id="bottom">
            <span>i</span>
            <p>{ info.category }</p>
          </div>
        </div>
        <div id="fill"></div>
        <div id="buttons">
          <div id="button">지원하기</div>
        </div>
      </div>
      <div id="content">
        <div id="card">
          <p id="title">동아리 소개</p>
        </div>
        <div id="row">
          <div id="card" style={{ flex: 7 }}>
            <p id="title">활동 내역</p>
          </div>
          <div id="col" style={{ flex: 6 }}>
            <div id="card">
              <p id="title">수상 내역</p>
            </div>
            <div id="card"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div id="page" className="detail"></div>
  );
}

export default Circle;
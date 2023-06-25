import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import { ReactComponent as Surfing1 } from '@assets/surfing-1.svg';
import { ReactComponent as Surfing2 } from '@assets/surfing-2.svg';
import { ReactComponent as Surfing3 } from '@assets/surfing-3.svg';
import { ReactComponent as Surfing4 } from '@assets/surfing-4.svg';
import { ReactComponent as SurfingLogo } from '@assets/surfing.large.svg';
import { ReactComponent as SurfingBottom } from '@assets/surfing.bottom.svg';

import { ReactComponent as Icons } from '@assets/icons.svg';
import { ReactComponent as Wave } from '@assets/wave.svg';

import qna from '@data/qna.json'

import '@styles/index.scss';
const Index = () => {
  const surfingBottom = React.useRef(null);
  const [scale, setScale] = React.useState(null);
  const [marginBottom, setMarginBottom] = React.useState(null);

  const resize = React.useCallback(() => {
    const surfingOriginalSize = {
      width: 1512,
    };
    const surfingBottomOriginalSize = {
      height: 800,
    };

    let newScale = window.innerWidth / surfingOriginalSize.width;
    newScale < 1 && (newScale = 1);
    setScale(newScale);
    setMarginBottom(surfingBottomOriginalSize.height * newScale - surfingBottomOriginalSize.height);
  }, []);

  React.useEffect(() => {
    resize();
    $(window).on('resize', resize);
    return () => {
      $(window).off('resize', resize)
    };
  }, [resize]);

  React.useEffect(() => {
    if (!scale) return;
    $('#surfing').addClass('show');
  }, [scale]);

  console.log("update");
  return (
    <div id="page" className='index'>
      <div id="full">
        <div id="surfing" style={{
          transform: `translateX(-50%) scale(${scale})`,
        }}>
          <SurfingLogo id="logo" />
          <Surfing4 id="surfing4" />
          <p id="text3">우리들의</p>
          <Surfing3 id="surfing3" />
          <p id="text2">파도 속으로</p>
          <Surfing2 id="surfing2" />
          <p id="text1">초대합니다</p>
          <Surfing1 id="surfing1" />
          <p id="description">제 1 회 한국디지털미디어고등학교 동아리 전시회</p>
        </div>
      </div>

      <Icons id="icons" />
      <p id="subtitle">전시회 소개</p>
      <p id="title">파도를 헤엄치다, Surfing.</p>
      <Wave id="wave" />
      <p id="description">surfing은 <span id="bold">제 1회 한국디지털미디어고등학교 동아리 전시회</span>입니다. surfing은 동아리 간의 활동 결과를 공유하여 <span id="bold">보다 건전한 동아리 문화를 조성하고 이를 기념하기 위해</span> 만들어졌습니다.</p>

      <p id="subtitle">자주 묻는 질문</p>
      <div id="qna">
        {qna.map((data, index) => (
          <div id="item" key={ index }>
            <p id="question">{ data.question }</p>
            <p id="answer">{ data.answer }</p>
          </div>
        ))}
      </div>

      <SurfingBottom id="bottom" style={{
        transform: `scale(${scale})`,
        marginBottom: `${marginBottom - 1}px`,
      }} ref={ surfingBottom } />

      <div id="quick">
        <p id="title">동아리 전시회 & 원서 접수</p>
        <p id="date">3월 10일 (금) ~ 3월 20일 (월) </p>
        <Link id="button" to={ "/circle" }>보러 가기</Link>
      </div>
    </div>
  )
};

export default Index;
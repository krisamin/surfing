import React from 'react';
import $ from 'jquery';

import '../style/index.scss';

import { ReactComponent as Surfing1 } from '../assets/surfing-1.svg';
import { ReactComponent as Surfing2 } from '../assets/surfing-2.svg';
import { ReactComponent as Surfing3 } from '../assets/surfing-3.svg';
import { ReactComponent as Surfing4 } from '../assets/surfing-4.svg';
import { ReactComponent as SurfingLogo } from '../assets/surfing.large.svg';
import { ReactComponent as SurfingBottom } from '../assets/surfing.bottom.svg';

import { ReactComponent as Icons } from '../assets/icons.svg';
import { ReactComponent as Wave } from '../assets/wave.svg';

const Index = () => {
  const surfing = React.useRef(null);
  const surfingBottom = React.useRef(null);
  const [surfingOriginalSize, setSurfingOriginalSize] = React.useState({
    width: null,
    height: null,
  });
  const [surfingBottomOriginalSize, setSurfingBottomOriginalSize] = React.useState({
    width: null,
    height: null,
  });
  const [scale, setScale] = React.useState(null);
  const [marginBottom, setMarginBottom] = React.useState(null);

  React.useEffect(() => {
    const resize = () => {
      if (!surfingOriginalSize.width || !surfingBottomOriginalSize.width) return;
      let newScale = window.innerWidth / surfingOriginalSize.width;
      newScale < 1 && (newScale = 1);
      setScale(newScale);
      setMarginBottom(surfingBottom.current.getBoundingClientRect().height - surfingBottomOriginalSize.height);
    }; resize();
    $(window).on('resize', resize);
    return () => $(window).off('resize', resize);
  });

  React.useEffect(() => {
    setSurfingOriginalSize({
      width: surfing.current.getBoundingClientRect().width,
      height: surfing.current.getBoundingClientRect().height,
    });
  }, [surfing.current]);

  React.useEffect(() => {
    setSurfingBottomOriginalSize({
      width: surfingBottom.current.getBoundingClientRect().width,
      height: surfingBottom.current.getBoundingClientRect().height,
    });
  }, [surfingBottom.current]);

  React.useEffect(() => {
    $('#surfing').addClass('show');

    return () => {
      $('#surfing').removeClass('show');
    };
  }, []);

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
          <Surfing1 id="surfing1" ref={ surfing } />
          <p id="description">제 1 회 한국디지털미디어고등학교 동아리 전시회</p>
        </div>
      </div>
      <Icons id="icons" />
      <p id="subtitle">전시회 소개</p>
      <p id="title">파도를 헤엄치다, Surfing.</p>
      <Wave id="wave" />
      <p id="description">surfing은 <span id="bold">제 1회 한국디지털미디어고등학교 동아리 전시회</span>입니다.<br />surfing은 동아리 간의 활동 결과를 공유하여 <span id="bold">보다 건전한 동아리 문화를<br />조성하고 이를 기념하기 위해</span> 만들어졌습니다.</p>
      <SurfingBottom id="bottom" style={{
        transform: `scale(${scale})`,
        marginBottom: `${marginBottom - 1}px`,
      }} ref={ surfingBottom } />
    </div>
  )
};

export default Index;
import React from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';

import '../style/circle.scss';

import circles from '../data/circles.json';

const Circle = () => {
  const [circleWidth, setCircleWidth] = React.useState(null);
  const [categories, setCategories] = React.useState([]);

  const resize = () => {
    if($('#circles').width() >= 1100) {
      setCircleWidth(($('#circles').width() - 16 * 2) / 3 - 56 - 2);
    } else if($('#circles').width() >= 800) {
      setCircleWidth(($('#circles').width() - 16 * 1) / 2 - 56 - 2);
    } else {
      setCircleWidth($('#circles').width() - 16 * 0 - 56 - 2);
    }
  };

  React.useEffect(() => {
    resize();
    $(window).on('resize', resize);
    $('#categories #category:nth-child(1)').addClass('active');

    const categories = [];
    circles.forEach((circle) => {
      if (!categories.includes(circle.category)) {
        categories.push(circle.category);
      }
    });
    setCategories(categories);

    return () => $(window).off('resize', resize);
  }, []);

  const selectCategory = (e) => {
    console.log(e);
    $('#categories #category').removeClass('active');
    $(e.target).addClass('active');

    if($(e.target).text() == "전체") {
      $('#circles #circle').css('display', 'flex');
    } else {
      $('#circles #circle').each((index, item) => {
        if ($(item).find('#content #category').text() === $(e.target).text()) {
          $(item).css('display', 'flex');
        } else {
          $(item).css('display', 'none');
        }
      });
    }
    resize();
  }

  return (
    <div id="page" className="circle">
      <p id="title">동아리 목록</p>
      <p id="description">surfing에서 전시하는 동아리 목록입니다.</p>
      <div id="my">
        <div id="text">
          <p>내 지원 현황</p>
          <p>신청한 뒤에는 취소할 수 없어요</p>
        </div>
        <div id="list">
          {["1", "2", "3"].map((item, index) => {
            return (
              <div id="item" key={ index }>
                <div id="logo"></div>
                <div id="content">
                  <div id="name">독도의 두 번째 등대</div>
                  <div id="status">서류 불합격</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div id="categories">
        {["전체", ...categories].map((item, index) => {
          return (
            <div id="category" key={ index } onClick={ selectCategory }>{ item }</div>
          )
        })}
      </div>
      <div id="circles">
        {circles.map((item, index) => {
          return (
            <Link to={ `/circle/${index + 1}` } id="circle" key={ index + 1 } style={{ minWidth: circleWidth, maxWidth: circleWidth }}>
              <div id="content">
                <div id="name">{ item.name }</div>
                <div id="category">{ item.category }</div>
              </div>
              <div id="logo"></div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}

export default Circle;
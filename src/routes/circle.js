import React from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';

import '../style/circle.scss';

import circles from '../data/circles.json';

import { useDispatch, useSelector } from "react-redux";
import circleSlice from "../redux/slices/circle";

const Circle = () => {
  const dispatch = useDispatch();
  const [circleWidth, setCircleWidth] = React.useState(0);
  const { search, scroll, category } = useSelector((state) => state.circle);

  let categories = [];
  circles.forEach((circle) => {
    if (!categories.includes(circle.category)) {
      categories.push(circle.category);
    }
  });

  const resize = () => {
    if($('#circles').width() >= 1100) {
      setCircleWidth(($('#circles').width() - 16 * 2) / 3 - 56 - 2);
    } else if($('#circles').width() >= 800) {
      setCircleWidth(($('#circles').width() - 16 * 1) / 2 - 56 - 2);
    } else {
      setCircleWidth($('#circles').width() - 16 * 0 - 56 - 2);
    }
  };

  const selectCategory = (e) => {
    dispatch(circleSlice.actions.setSearch(null));
    dispatch(circleSlice.actions.setCategory($(e.target).index()));
  }

  React.useEffect(() => {
    resize();
    $(window).on('resize', resize);

    return () => {
      $(window).off('resize');
      $("#root").off('scroll');
    };
  }, []);

  React.useEffect(() => {
    if(!circleWidth) return;
    $("#root").off('scroll');
    $("#root").scrollTop(scroll);
    $("#root").on('scroll', () => {
      dispatch(circleSlice.actions.setScroll($("#root").scrollTop()));
    });
  }, [dispatch, scroll, circleWidth]);

  React.useEffect(() => {
    if (search) dispatch(circleSlice.actions.setCategory(0));
  }, [dispatch, search]);

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
        {["전체", ...categories].map((item, index) => (
          <div id="category" key={ index } onClick={ selectCategory } className={ category === index ? "active" : "" }>{ item }</div>
        ))}
      </div>
      <div id="circles">
        {circleWidth ? circles.map((item, index) => (
          <Link
            to={ `/circle/${index + 1}` }
            id="circle" key={ index + 1 }
            style={{
              minWidth: circleWidth,
              maxWidth: circleWidth,
              display: search ? (item.name.includes(search) ? "flex" : "none") : (category ? (item.category === categories[category - 1] ? "flex" : "none") : "flex")
            }}
          >
            <div id="content">
              <div id="name">{ item.name }</div>
              <div id="category">{ item.category }</div>
            </div>
            <div id="logo"></div>
          </Link>
        )) : null}
      </div>
    </div>
  );
}

export default Circle;
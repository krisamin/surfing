import React from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';

import Loading from "../components/loading";

import '../style/circle.scss';

import circles from '../data/circles';
import strings from '../data/strings.json';

import { ReactComponent as WarningSvg } from '../assets/warning.svg';

import { useDispatch, useSelector } from "react-redux";
import userSlice from "../redux/slices/user";
import circleSlice from "../redux/slices/circle";

import { Fireworks } from '@fireworks-js/react';
import Confetti from "react-confetti";

const Circle = () => {
  const dispatch = useDispatch();
  const [circleWidth, setCircleWidth] = React.useState(0);
  const { search, scroll, category, period } = useSelector((state) => state.circle);
  const { auth, submit } = useSelector((state) => state.user);

  let categories = [];
  circles.forEach((circle) => {
    if (categories.includes(circle.category)) return;
    if (circle.category === "-") return;
    categories.push(circle.category);
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
    dispatch(userSlice.actions.setSubmit(false));

    return () => {
      $(window).off('resize');
      $("#root").off('scroll');
    };
  }, [dispatch]);

  const [isBoom, setIsBoom] = React.useState(false);
  React.useEffect(() => {
    if(!circleWidth) return;
    $("#root").off('scroll');
    $("#root").scrollTop(scroll);
    $("#root").on('scroll', () => {
      dispatch(circleSlice.actions.setScroll($("#root").scrollTop()));
    });
    
    let count = 0;
    for(const [, sub] of Object.entries(submit)) {
      if(!["REJECTED", "SECONDREJECTED"].includes(sub.status)) count += 1;
    }
    if(count) setIsBoom(true);
    else setIsBoom(false);
    /*if(count === 0 && submit.length >= 1) setIsBoom(true);
    else setIsBoom(false);*/
  }, [dispatch, scroll, circleWidth, submit]);

  React.useEffect(() => {
    if (search) dispatch(circleSlice.actions.setCategory(0));
  }, [dispatch, search]);

  return (
    <div id="page" className="circle">
      <Loading visible={(submit === false && auth.authenticated) || !circleWidth} />
      {isBoom && (
        <>
          <Fireworks
            options={{
              rocketsPoint: {
                min: 0,
                max: 100
              }
            }}
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: 'fixed',
              pointerEvents: 'none'
            }}
          />
          <Confetti
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: 'fixed',
              pointerEvents: 'none'
            }}
          />
        </>
      )}
      <p id="title">동아리 목록</p>
      <p id="description">surfing에서 전시하는 동아리 목록입니다.</p>
      {(auth.authenticated && period !== "PREPARING" /*&& (submit.length || typeof(submit) === "boolean")*/) ? (
        <div id="my">
          <div id="text">
            <p>내 지원 현황</p>
            <p><WarningSvg />신청한 뒤에는 취소할 수 없어요</p>
          </div>
          <div id="list">
            {submit && submit.length ? submit.map((item, index) => {
              return (
                <div id="item" key={ index }>
                  <div
                    id="logo"
                    style={{
                      backgroundImage: `url(/data/${item.circle_id}/${ circles.map((circle, index) => {
                        if(item.circle_id === circle.no) return circle.logo;
                        return null;
                      }).filter((item) => item !== null)[0]})`
                    }} 
                  />
                  <div id="content">
                    <div id="name">{ circles.map((circle, index) => {
                      if(item.circle_id === circle.no) return circle.name;
                      return null;
                    })}</div>
                    <div id="status" className={
                      ["FIRST", "SECOND"].includes(item.status) ? "bold" : ["FINALCHOICE"].includes(item.status) ? "superbold" : ""
                    }>{ strings.result[item.status] }</div>
                  </div>
                </div>
              )
            }) : (
              <div id="item" style={{ opacity: 0 }}>
                <div id="logo"></div>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div id="categories">
        {["전체", ...categories].map((item, index) => (
          <div id="category" key={ index } onClick={ selectCategory } className={ category === index ? "active" : "" }>{ item }</div>
        ))}
      </div>
      <div id="circles">
        {circleWidth ? circles.map((item, index) => (
          <Link
            to={ `/circle/${ item.no }` }
            id="circle"
            key={ item.no }
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
            <div
              id="logo"
              style={{
                opacity: item.logo ? 1 : 0,
                backgroundImage: `url(/data/${item.no}/${item.logo})`
              }} />
          </Link>
        )) : null}
      </div>
    </div>
  );
}

export default Circle;
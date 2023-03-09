import React from "react";
import { useNavigate } from "react-router-dom";
//import $ from 'jquery';

import Loading from "../components/loading";

import { useParams } from "react-router-dom";

import { ReactComponent as BackSvg } from '../assets/back.svg';
import { ReactComponent as CloseSvg } from '../assets/close.svg';
import { ReactComponent as WarningSvg } from '../assets/warning.svg';
import { ReactComponent as CategorySvg } from '../assets/surfing-category.svg';
import { ReactComponent as InstagramSvg } from '../assets/surfing-instagram.svg';
import { ReactComponent as WebSvg } from '../assets/surfing-web.svg';

import strings from '../data/strings.json';
import circles from '../data/circles';
import questions from '../data/questions.json';
import colors from '../data/colors.json';

import { useSelector } from "react-redux";
import { AxiosContext } from "../provider/axios";
//import circleSlice from "../redux/slices/circle";

import '../style/detail.scss';
const Circle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
//  const dispatch = useDispatch();
  const { authAxios } = React.useContext(AxiosContext);
  const [circleInfo, setCircleInfo] = React.useState(null);
  const [apply, setApply] = React.useState(false);
  const [writing, setWriting] = React.useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const { auth, submit, info } = useSelector((state) => state.user);
  const { period } = useSelector((state) => state.circle);

  const [numberName, setNumberName] = React.useState("");
  const numberNameRegex = new RegExp("^[0-9]{4} .{2,5}$");

  const fillZero = (num, zero) => {
    let str = num.toString();
    while(str.length < zero) {
      str = "0" + str;
    }
    return str;
  }

  const [isFirst, setIsFirst] = React.useState(true);
  React.useEffect(() => {
    if(!info.user_id || !id) return;
    const writing = localStorage.getItem(`writing-${ info.user_id }-${ id }`);
    if(writing) {
      setWriting(JSON.parse(writing));
    }
    setIsFirst(false);
  }, [id, info]);

  React.useEffect(() => {
    if(!info.user_id || !id || isFirst) return;
    localStorage.setItem(`writing-${ info.user_id }-${ id }`, JSON.stringify(writing));
  }, [writing, id, info, isFirst]);

  React.useEffect(() => {
    if(!info.user_student_no) return;
    setNumberName(`${ info.user_grade }${ info.user_class }${ fillZero(info.user_student_no, 2) } ${ info.real_name }`);
  }, [info]);

  const toRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b].join(', ');
  }

  React.useEffect(() => {
    const target = circles.map((item) => {
      if(item.no === +id) return item;
      return null;
    }).filter((item) => item !== null)[0];
    if(target == null) {
      navigate('/circle', { replace: true });
    } else {
      setCircleInfo(target);
    }

    const root = document.documentElement;
    let color = colors[target.name];

    if(!color) color = colors["기본"];
    root.style.setProperty('--white', color["white"]);
    root.style.setProperty('--grade-1', color["grade-1"]);
    root.style.setProperty('--grade-2', color["grade-2"]);
    root.style.setProperty('--grade-3', color["grade-3"]);
    root.style.setProperty('--grade-4', color["grade-4"]);
    root.style.setProperty('--grade-5', color["grade-5"]);
    root.style.setProperty('--grade-6', color["grade-6"]);
    root.style.setProperty('--grade-7', color["grade-7"]);
    root.style.setProperty('--grade-8', color["grade-8"]);
    root.style.setProperty('--grade-9', color["grade-9"]);
    root.style.setProperty('--black', color["black"]);
    root.style.setProperty('--white-hex', toRGB(color["white"]));
    root.style.setProperty('--grade-1-hex', toRGB(color["grade-1"]));
    root.style.setProperty('--grade-2-hex', toRGB(color["grade-2"]));
    root.style.setProperty('--grade-3-hex', toRGB(color["grade-3"]));
    root.style.setProperty('--grade-4-hex', toRGB(color["grade-4"]));
    root.style.setProperty('--grade-5-hex', toRGB(color["grade-5"]));
    root.style.setProperty('--grade-6-hex', toRGB(color["grade-6"]));
    root.style.setProperty('--grade-7-hex', toRGB(color["grade-7"]));
    root.style.setProperty('--grade-8-hex', toRGB(color["grade-8"]));
    root.style.setProperty('--grade-9-hex', toRGB(color["grade-9"]));
    root.style.setProperty('--black-hex', toRGB(color["black"]));

    return () => {
      root.style.removeProperty('--white');
      root.style.removeProperty('--grade-1');
      root.style.removeProperty('--grade-2');
      root.style.removeProperty('--grade-3');
      root.style.removeProperty('--grade-4');
      root.style.removeProperty('--grade-5');
      root.style.removeProperty('--grade-6');
      root.style.removeProperty('--grade-7');
      root.style.removeProperty('--grade-8');
      root.style.removeProperty('--grade-9');
      root.style.removeProperty('--black');
      root.style.removeProperty('--white-hex');
      root.style.removeProperty('--grade-1-hex');
      root.style.removeProperty('--grade-2-hex');
      root.style.removeProperty('--grade-3-hex');
      root.style.removeProperty('--grade-4-hex');
      root.style.removeProperty('--grade-5-hex');
      root.style.removeProperty('--grade-6-hex');
      root.style.removeProperty('--grade-7-hex');
      root.style.removeProperty('--grade-8-hex');
      root.style.removeProperty('--grade-9-hex');
      root.style.removeProperty('--black-hex');
    }
  }, [id, navigate]);

  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await authAxios.post('/auth/student_info', {
        user_student_no: numberName.split(" ")[0].substring(2, 4),
        user_realname: numberName.split(" ")[1],
      });
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }

    try {
      const data = {
        circle_id: id,
        question1: writing[0],
        question2: writing[1],
        question3: writing[2],
        question4: writing[3],
      };
      const result = await authAxios.post('/submit', data);
      console.log(result.data);
      navigate('/circle', { replace: true });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return circleInfo ? (
    <div id="page" className="detail">
      <Loading visible={ loading } />
      <div id="header">
        <div
          id="back"
          onClick={() => {
            navigate("/circle", { replace: true });
          }}
        >
          <BackSvg />
        </div>
        <div
          id="logo"
          style={{
            opacity: circleInfo.logo ? 1 : 0,
            backgroundImage: `url(/data/${circleInfo.no}/${circleInfo.logo})`
          }}
        />
        <div id="info">
          <div id="top">
            <p id="name">{circleInfo.name}</p>
            <div id="links">
              {circleInfo.instagram && ( <a id="link" href={ circleInfo.instagram } rel="noreferrer" target="_blank"><InstagramSvg /></a> )}
              {circleInfo.link && ( <a id="link" href={ circleInfo.link } rel="noreferrer" target="_blank"><WebSvg /></a> )}
            </div>
          </div>
          <div id="bottom">
            <CategorySvg />
            <p>{circleInfo.category}</p>
          </div>
        </div>
        <div id="fill"></div>
        <div id="buttons">
          {auth.authenticated && submit !== false && period && (
            <div
              id="button"
              className={(period !== "SUBMITTING" || submit.map((item) => item.circle_id).includes(+id) || submit.length >= 3) ? "disabled" : ""}
              onClick={() => {
                setApply(true);
              }}
            >
              { submit.map((item) => item.circle_id).includes(+id) ? "지원완료" : strings.submit[period] }
            </div>
          )}
        </div>
      </div>
      {(circleInfo.description || circleInfo.activity || (circleInfo.awards.length !== 0) || circleInfo.video) && (
        <div id="content">
          {circleInfo.description && (
            <div id="card">
              <p id="title">동아리 소개</p>
              <div id="info">
                {circleInfo.slogan && ( <p id="slogan">{ circleInfo.slogan }</p> )}
                <p id="description" dangerouslySetInnerHTML={{__html: circleInfo.description.replace(/\n/g, "<br />")}} />
              </div>
            </div>
          )}
          {(circleInfo.activity || (circleInfo.awards.length !== 0) || circleInfo.video) && (
            <div id="row">
              {circleInfo.activity && (
                <div id="card" style={{ flex: 7 }}>
                  <p id="title">활동 내역</p>
                  <div id="info">
                    <p id="description" dangerouslySetInnerHTML={{__html: circleInfo.activity.replace(/\n/g, "<br />")}} />
                  </div>
                </div>
              )}
              {((circleInfo.awards.length !== 0) || circleInfo.video) && (
                <div id="col" style={{ flex: 6 }}>
                  {circleInfo.video && (
                    <div id="card" className="video">
                      <div id="inner">
                        <iframe id="player" title="영상" type="text/html" src={ "https://www.youtube.com/embed/" + circleInfo.video + "?enablejsapi=1&origin=https://surfing.preview.one"} />
                      </div>
                    </div>
                  )}
                  {(circleInfo.awards.length !== 0) && (
                    <div id="card" className="awards">
                      <p id="title">수상 내역</p>
                      <div id="list">
                        {circleInfo.awards.map((award, index) => (
                          <div id="item" key={ index } style={{ order:  -award.name.length }}>
                            <p id="level">{ award.level }</p>
                            <p id="name">{ award.name }</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {circleInfo.pic.length > 0 && (
        <div id="gallery">
          <p id="title" className="gallery">동아리 갤러리</p>
          <div id="list">
            {circleInfo.pic.map((item, index) => (
              <div id="item" key={ index } style={{ backgroundImage: `url(/data/${circleInfo.no}/${item})` }} />
            ))}
          </div> 
        </div>
      )}
      <div id="apply" className={apply ? "show" : ""}>
        <div id="window">
          <div id="header">
            <div
              id="close"
              onClick={() => {
                setApply(false);
              }}
            >
              <CloseSvg />
            </div>
            <div
              id="logo"
              style={{
                opacity: circleInfo.logo ? 1 : 0,
                backgroundImage: `url(/data/${circleInfo.no}/${circleInfo.logo})`
              }}
            />
            <p id="title">{circleInfo.name}</p>
            <p id="subtitle">지원하기</p>
            <div id="fill"></div>
            <p id="warning"><WarningSvg />작성하신 내용은 창을 닫아도 자동으로 저장됩니다</p>
          </div>
          <div id="content">
            {questions.map((question, index) => (
              <div id="input" key={index}>
                <p id="placeholder">{question}</p>
                <textarea
                  placeholder="최대 300자로 작성해주세요."
                  id="name"
                  type="text"
                  value={writing[index]}
                  onChange={(e) => {
                    if(e.target.value.length > 300) e.target.value = e.target.value.slice(0, 300);
                    setWriting({
                      ...writing,
                      [index]: e.target.value,
                    });
                  }}
                />
                <p id="count">{ writing[index].length } / 300</p>
              </div>
            ))}
            <div id="input">
              <p id="placeholder">마지막으로, 본인의 학번과 이름을 입력해주세요.</p>
              <input
                placeholder="예시) 1230 강디미"
                value={ numberName }
                onChange={(e) => {
                  setNumberName(e.target.value);
                }}
                readOnly={ info.user_student_no }
                id="name"
                type="text"
              />
            </div>
          </div>
          <div id="submit" onClick={onSubmit} className={ writing[0] && writing[1] && writing[2] && writing[3] && numberNameRegex.test(numberName) ? "" : "disabled" }>
            제출하기
          </div>
          <p id="warning"><WarningSvg />제출하시면 내용을 변경할 수 없습니다</p>
        </div>
      </div>
    </div>
  ) : (
    <div id="page" className="detail"></div>
  );
}

export default Circle;
import React from "react";
import { useNavigate } from "react-router-dom";
//import $ from 'jquery';

import Loading from "../components/loading";

import { useParams } from "react-router-dom";

import { ReactComponent as BackSvg } from '../assets/back.svg';
import { ReactComponent as CloseSvg } from '../assets/close.svg';
import { ReactComponent as CategorySvg } from '../assets/surfing-category.svg';
import { ReactComponent as InstagramSvg } from '../assets/surfing-instagram.svg';
import { ReactComponent as WebSvg } from '../assets/surfing-web.svg';

import strings from '../data/strings.json';
import circles from '../data/circles';
import questions from '../data/questions.json';

import { useSelector } from "react-redux";
import { AxiosContext } from "../provider/axios";
//import circleSlice from "../redux/slices/circle";

import '../style/detail.scss';
const Circle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
//  const dispatch = useDispatch();
  const { authAxios } = React.useContext(AxiosContext);
  const [info, setInfo] = React.useState(null);
  const [apply, setApply] = React.useState(false);
  const [writing, setWriting] = React.useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const { auth, submit } = useSelector((state) => state.user);
  const { period } = useSelector((state) => state.circle);

  React.useEffect(() => {
    const target = circles.map((item) => {
      if(item.no === +id) return item;
      return null;
    }).filter((item) => item !== null)[0];
    if(target == null) {
      navigate('/circle', { replace: true });
    } else {
      setInfo(target);
    }
  }, [id, navigate]);

  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    setLoading(true);
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

  return info ? (
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
            opacity: info.logo ? 1 : 0,
            backgroundImage: `url(/data/${info.no}/${info.logo})`
          }}
        />
        <div id="info">
          <div id="top">
            <p id="name">{info.name}</p>
            <div id="links">
              {info.instagram && ( <a id="link" href={ info.instagram } rel="noreferrer" target="_blank"><InstagramSvg /></a> )}
              {info.link && ( <a id="link" href={ info.link } rel="noreferrer" target="_blank"><WebSvg /></a> )}
            </div>
          </div>
          <div id="bottom">
            <CategorySvg />
            <p>{info.category}</p>
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
      {(info.description || info.activity || info.awards[0].name || info.video) && (
        <div id="content">
          {info.description && (
            <div id="card">
              <p id="title">동아리 소개</p>
              <div id="info">
                {info.slogan && ( <p id="slogan">{ info.slogan }</p> )}
                <p id="description" dangerouslySetInnerHTML={{__html: info.description.replace(/\n/g, "<br />")}} />
              </div>
            </div>
          )}
          {(info.activity || info.awards[0].name || info.video) && (
            <div id="row">
              {info.activity && (
                <div id="card" style={{ flex: 7 }}>
                  <p id="title">활동 내역</p>
                  <div id="info">
                    <p id="description" dangerouslySetInnerHTML={{__html: info.activity.replace(/\n/g, "<br />")}} />
                  </div>
                </div>
              )}
              {(info.awards[0].name || info.video) && (
                <div id="col" style={{ flex: 6 }}>
                {info.awards[0].name && (
                  <div id="card" className="awards">
                    <p id="title">수상 내역</p>
                    <div id="list">
                      {info.awards.map((award, index) => (
                        <div id="item" key={ index }>
                          <p id="level">{ award.level }</p>
                          <p id="name">{ award.name }</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {info.video && (
                  <div id="card" className="video">
                    <div id="inner">
                      <iframe id="player" title="영상" type="text/html" src={ "http://www.youtube.com/embed/" + info.video} />
                    </div>
                  </div>
                )}
              </div>
              )}
            </div>
          )}
        </div>
      )}
      {info.pic.length > 0 && (
        <div id="gallery">
          <p id="title" className="gallery">동아리 갤러리</p>
          <div id="list">
            {info.pic.map((item, index) => (
              <div id="item" key={ index } style={{ backgroundImage: `url(/data/${info.no}/${item})` }} />
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
                opacity: info.logo ? 1 : 0,
                backgroundImage: `url(/data/${info.no}/${info.logo})`
              }}
            />
            <p id="title">{info.name}</p>
            <p id="subtitle">지원하기</p>
            <div id="fill"></div>
            <p id="warning">작성하신 내용은 창을 닫아도 자동으로 저장됩니다</p>
          </div>
          <div id="content">
            {questions.map((question, index) => (
              <div id="input" key={index}>
                <p id="placeholder">{question}</p>
                <textarea
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
          </div>
          <div id="submit" onClick={onSubmit}>
            제출하기
          </div>
          <p id="warning">제출하시면 내용을 변경할 수 없습니다</p>
        </div>
      </div>
    </div>
  ) : (
    <div id="page" className="detail"></div>
  );
}

export default Circle;
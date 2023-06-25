import React from "react";
import { useNavigate } from "react-router-dom";

import Loading from "@components/loading";

import { useSelector } from "react-redux";
import { AxiosContext } from "@provider/axios";

import circles from "@data/circles";
import questions from "@data/questions.json";
import strings from "@data/strings.json";

import "@styles/admin.scss";
const Admin = () => {
  const navigate = useNavigate();
  const { authAxios } = React.useContext(AxiosContext);
  const { loaded, info } = useSelector((state) => state.user);
  const { period } = useSelector((state) => state.circle);
  const [circleId, setCircleId] = React.useState(false);
  const [submitList, setSubmitList] = React.useState([]);
  const [selectedSubmit, setSelectedSubmit] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const getSubmits = React.useCallback(async () => {
    setLoading(true);
    try {
      const result = await authAxios.get("/circle_admin/submit");
      console.log(result.data);
      setSubmitList(result.data.submit_list);
      circles.forEach((item, index) => {
        if (item.no === result.data.circle_id) {
          setCircleId(index);
        }
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [authAxios]);

  React.useEffect(() => {
    if (loaded) {
      if (["CIRCLE_ADMIN", "CIRCLE_VICE_ADMIN"].indexOf(info.role) === -1) {
        navigate("/circle", { replace: true });
      } else {
        getSubmits();
      }
    }
  }, [loaded, navigate, info, getSubmits]);

  const onConfirm = React.useCallback(async () => {
    if (selectedSubmit === false) return;
    setLoading(true);
    try {
      const type = ["first", "second"][["FIRSTEVAL", "SECONDEVAL"].indexOf(period)];
      const result = await authAxios.get(`/circle_admin/${type}confirm`, {
        params: {
          submit_id: submitList[selectedSubmit].submit_id,
        },
      });
      console.log(result.data);
      await getSubmits();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [authAxios, submitList, selectedSubmit, getSubmits, period]);

  const onReject = React.useCallback(async () => {
    if (selectedSubmit === false) return;
    setLoading(true);
    try {
      const type = ["first", "second"][["FIRSTEVAL", "SECONDEVAL"].indexOf(period)];
      const result = await authAxios.get(`/circle_admin/${type}reject`, {
        params: {
          submit_id: submitList[selectedSubmit].submit_id,
        },
      });
      console.log(result.data);
      await getSubmits();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [authAxios, submitList, selectedSubmit, getSubmits, period]);

  const fillZero = (num, zero) => {
    let str = num.toString();
    while(str.length < zero) {
      str = "0" + str;
    }
    return str;
  }

  console.log("update");
  return (
    <div id="page" className="admin">
      <Loading visible={loading} />
      <div id="header">
        <div id="text">
          <p id="title">신청 관리 - {submitList.length}개</p>
          <p id="description">내가 동장인 동아리를 관리할 수 있습니다.</p>
        </div>
        {circleId !== false && (
          <div id="circle">
            <div id="info">
              <p id="name">{circles[circleId]?.name}</p>
              <p id="category">{circles[circleId]?.category}</p>
            </div>
            <div
              id="logo"
              style={{
                opacity: circles[circleId].logo ? 1 : 0,
                backgroundImage: `url(/data/${circles[circleId].no}/${circles[circleId].logo})`
              }}
            />
          </div>
        )}
      </div>
      {circleId !== false && (
        <div id="content">
          <div id="users">
            {submitList.map((submit, index) => (
              <div id="user" key={ index } className={ index === selectedSubmit ? "selected" : "" } onClick={(e) => {
                if(index !== selectedSubmit) {
                  setSelectedSubmit(index);
                } else {
                  setSelectedSubmit(false);
                }
              }}>
                <p id="name">{ submit.submitter_grade }{ submit.submitter_class }{ fillZero(submit.submitter_student_no, 2) } { submit.submitter_realname }</p>
                <p id="status" className={
                  ["FIRST", "SECOND"].indexOf(submit.status) !== -1 ? "bold" : ["FINALCHOICE"].indexOf(submit.status) !== -1 ? "superbold" : ""
                }>{ strings.result[submit.status] }</p>
              </div>
            ))}
          </div>
          <div id="application" className={ selectedSubmit === false ? "hidden" : "" }>
            <p id="title">지원서 보기</p>
            {selectedSubmit !== false && (
              <div id="list">
                {questions.map((question, index) => (
                  <div id="item" key={ index }>
                    <p id="question">{ question }</p>
                    <p id="answer">{ submitList[selectedSubmit][["question1", "question2", "question3", "question4"][index]] }</p>
                    <p id="count">{ submitList[selectedSubmit][["question1", "question2", "question3", "question4"][index]].length } / 300 자</p>
                  </div>
                ))}
              </div>
            )}
            {["FIRSTEVAL", "SECONDEVAL"].indexOf(period) !== -1 && (
              <div id="buttons">
                <div id="button" className="primary" onClick={ onConfirm }>
                  {["FIRSTEVAL", "SECONDEVAL"].indexOf(period) === 0 ? "서류 합격" : "최종 합격"}
                </div>
                <div id="button" className="secondary" onClick={ onReject }>
                  {["FIRSTEVAL", "SECONDEVAL"].indexOf(period) === 0 ? "서류 탈락" : "최종 탈락"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

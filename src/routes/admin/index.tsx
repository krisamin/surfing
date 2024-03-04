import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useAdmin, useCircles, useToken } from "../layout";
import { questions } from "../circle/[id]";

import styles from "~/styles/admin.module.scss";
import { submitStatusString } from "~/types";

export default component$(() => {
  const circles = useCircles();
  const token = useToken();
  const admin = useAdmin();

  const view = useStore({
    submit: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  const circle = circles.value.find(
    (circle) => circle._id === token.value?.user.admin
  );

  if (!circle) {
    return <p>권한이 없습니다</p>;
  }
  return (
    <div id="container">
      <div id="header">
        <div id="left">
          <p>신청 관리</p>
          <p>내가 동장인 동아리를 관리할 수 있습니다.</p>
        </div>
        <div id="right">
          <div id="info">
            <p>{circle.name}</p>
            <p>{circle.category}</p>
          </div>
          <img
            width={80}
            height={80}
            id="logo"
            crossOrigin="anonymous"
            src={`${import.meta.env.PUBLIC_API_URL}/assets/${circle.logo}`}
          />
        </div>
      </div>
      <div class={styles.container}>
        <div class={styles.sidebar}>
          {admin.value.map((submit, index) => (
            <div
              key={index}
              class={[styles.item, view.submit === submit._id && styles.active]}
              onClick$={() => {
                if (view.submit === submit._id) {
                  view.submit = "";
                  return;
                }
                view.submit = submit._id;
                view.question1 = submit.question1;
                view.question2 = submit.question2;
                view.question3 = submit.question3;
                view.question4 = submit.question4;
              }}
            >
              <p>
                {submit.user.grade}
                {submit.user.class}
                {String(submit.user.number).padStart(2, "0")} {submit.user.name}
              </p>
              <p>{submitStatusString[submit.status]}</p>
            </div>
          ))}
        </div>
        {view.submit && (
          <div class={styles.content}>
            <p class={styles.title}>지원서 보기</p>
            <div class={styles.list}>
              {questions.map((question, index) => {
                const content =
                  view[`question${index + 1}` as keyof typeof view];
                return (
                  <div key={index} class={styles.item}>
                    <p class={styles.key}>{question}</p>
                    <p class={styles.value}>{content}</p>
                    <p class={styles.length}>{content.length} / 300</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "surfing.",
  meta: [
    {
      name: "description",
      content: "한국디지털미디어고등학교 동아리 전시회",
    },
    {
      property: "og:description",
      content: "한국디지털미디어고등학교 동아리 전시회",
    },
  ],
};

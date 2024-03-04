import { component$, useStore } from "@builder.io/qwik";
import { routeAction$, type DocumentHead } from "@builder.io/qwik-city";
import { useAdmin, useCircles, useStatus, useToken } from "../layout";
import { questions } from "../circle/[id]";

import styles from "~/styles/admin.module.scss";
import { submitStatusString } from "~/types";

export const useFirst = routeAction$(async (data) => {
  await fetch(`${import.meta.env.PUBLIC_API_URL}/circle/first`, {
    headers: {
      Authorization: `Bearer ${data.access}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
});

export const useSecond = routeAction$(async (data) => {
  await fetch(`${import.meta.env.PUBLIC_API_URL}/circle/second`, {
    headers: {
      Authorization: `Bearer ${data.access}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
});

export default component$(() => {
  const status = useStatus();
  const circles = useCircles();
  const token = useToken();
  const admin = useAdmin();

  const first = useFirst();
  const second = useSecond();

  const view = useStore({
    submit: "",
    status: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  const circle = circles.value.find(
    (circle) => circle._id === token.value?.user.admin
  );

  if (!circle || !token.value) {
    return <p>권한이 없습니다</p>;
  }
  return (
    <div id="container">
      <div id="header">
        <div id="left">
          <p>지원 관리</p>
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
                view.status = submit.status;
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
              <p class={styles[submit.status.toLowerCase()]}>
                {submitStatusString[submit.status]}
              </p>
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
            {status.value == "FIRST" &&
              ["SUBMIT", "FIRST", "FIRSTREJECT"].includes(view.status) && (
                <div class={styles.buttons}>
                  <div
                    class={[styles.button, styles.true]}
                    onClick$={async () => {
                      first.submit({
                        access: token.value.access,
                        submit: view.submit,
                        pass: true,
                      });
                    }}
                  >
                    <p>합격하기</p>
                  </div>
                  <div
                    class={[styles.button, styles.false]}
                    onClick$={async () => {
                      first.submit({
                        access: token.value.access,
                        submit: view.submit,
                        pass: false,
                      });
                    }}
                  >
                    <p>반려하기</p>
                  </div>
                </div>
              )}
            {status.value == "SECOND" &&
              ["FIRST", "SECOND", "SECONDREJECT"].includes(view.status) && (
                <div class={styles.buttons}>
                  <div
                    class={[styles.button, styles.true]}
                    onClick$={async () => {
                      second.submit({
                        access: token.value.access,
                        submit: view.submit,
                        pass: true,
                      });
                    }}
                  >
                    <p>최종 합격</p>
                  </div>
                  <div
                    class={[styles.button, styles.false]}
                    onClick$={async () => {
                      second.submit({
                        access: token.value.access,
                        submit: view.submit,
                        pass: false,
                      });
                    }}
                  >
                    <p>반려하기</p>
                  </div>
                </div>
              )}
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

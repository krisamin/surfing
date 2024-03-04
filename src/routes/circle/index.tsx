import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { useCircles, useMy, useToken } from "../layout";
import type { Submit } from "~/types";
import { submitStatusString } from "~/types";

import styles from "~/styles/circle.module.scss";

export default component$(() => {
  const token = useToken();
  const circles = useCircles();
  const my = useMy();

  return (
    <div id="container">
      <div id="header">
        <div id="left">
          <p>동아리 목록</p>
          <p>surfing에서 전시하는 동아리 목록입니다.</p>
        </div>
      </div>
      {token.value && (
        <div class={styles.my}>
          <div class={styles.header}>
            <p class={styles.title}>내 지원 현황</p>
          </div>
          <div class={styles.list}>
            {[0, 1, 2].map((index) => {
              const submit = my.value[index] as Submit | null;
              if (submit) {
                return (
                  <div key={index} class={styles.item}>
                    <img
                      width={90}
                      height={90}
                      class={styles.logo}
                      crossOrigin="anonymous"
                      src={`${import.meta.env.PUBLIC_API_URL}/assets/${submit.circle.logo}`}
                    />
                    <div class={styles.info}>
                      <p class={styles.name}>{submit.circle.name}</p>
                      <p class={styles.status}>
                        {submitStatusString[submit.status]}
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} class={styles.item}>
                    <div class={styles.dummy} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
      <div class={styles.grid}>
        {circles.value.map((circle) => (
          <Link key={circle._id} class={styles.item} href={circle._id} prefetch>
            <div class={styles.info}>
              <p>{circle.name}</p>
              <p>{circle.category}</p>
            </div>
            <img
              width={80}
              height={80}
              class={styles.logo}
              crossOrigin="anonymous"
              src={`${import.meta.env.PUBLIC_API_URL}/assets/${circle.logo}`}
            />
          </Link>
        ))}
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

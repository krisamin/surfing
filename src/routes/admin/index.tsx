import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import styles from "~/styles/index.module.scss";

export default component$(() => {
  return (
    <div class={styles.container}>
      관리
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

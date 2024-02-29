import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { useCircles } from "../layout";

import styles from "~/styles/circle.module.scss";

export default component$(() => {
  const circles = useCircles();

  return (
    <div id="container">
      <div id="header">
        <p>동아리 목록</p>
        <p>surfing에서 전시하는 동아리 목록입니다.</p>
      </div>
      <div class={styles.grid}>
        {circles.value.map((circle) => (
          <Link class={styles.item} href={circle._id} key={circle._id}>
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
  title: "Surfing.",
  meta: [
    {
      name: "description",
      content: "한국디지털미디어고등학교 동아리 전시회",
    },
  ],
};

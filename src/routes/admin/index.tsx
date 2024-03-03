import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useCircles, useToken } from "../layout";

import styles from "~/styles/index.module.scss";

export default component$(() => {
  const circles = useCircles();
  const token = useToken();

  const circle = circles.value.find(
    (circle) => circle._id === token.value?.user.admin
  );
  console.log(circle);

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

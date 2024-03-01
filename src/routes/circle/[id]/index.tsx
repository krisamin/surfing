import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { useCircles } from "../../layout";

import styles from "~/styles/detail.module.scss";

export const useCircle = routeLoader$(async (requestEvent) => {
  const circles = await requestEvent.resolveValue(useCircles);
  const circle = circles.find(
    (circle) => circle._id === requestEvent.params.id
  );

  if (!circle) {
    return requestEvent.fail(404, {
      errorMessage: "not found",
    });
  }

  return circle;
});

export default component$(() => {
  const circle = useCircle();

  if (circle.value.errorMessage) {
    return <p>{circle.value.errorMessage}</p>;
  }
  return (
    <div id="container">
      <div class={styles.header}>
        {/* <Link class={styles.back} href={"../"} /> */}
        <img
          width={100}
          height={100}
          class={styles.logo}
          crossOrigin="anonymous"
          src={`${import.meta.env.PUBLIC_API_URL}/assets/${circle.value.logo}`}
        />
        <div class={styles.info}>
          <div class={styles.name}>
            <p>{circle.value.name}</p>
            <div class={styles.link}>
              {circle.value.instagram && (
                <Link
                  class={[styles.icon, styles.instagram]}
                  href={circle.value.instagram}
                  target="_blank"
                />
              )}
              {circle.value.website && (
                <Link
                  class={[styles.icon, styles.website]}
                  href={circle.value.website}
                  target="_blank"
                />
              )}
            </div>
          </div>
          <div class={styles.category}>
            <div class={styles.icon} />
            <p>{circle.value.category}</p>
          </div>
        </div>
      </div>
      <div class={styles.column}>
        <div class={styles.box}>
          <p class={styles.title}>동아리 소개</p>
          <div class={styles.content}>
            <p class={styles.slogun}>{circle.value.slogun}</p>
            <p
              class={styles.text}
              dangerouslySetInnerHTML={circle.value.introducing?.replace(
                /\n/g,
                "<br />"
              )}
            />
          </div>
        </div>
        <div class={styles.row}>
          {circle.value.history && (
            <div class={styles.column}>
              <div class={styles.box}>
                <p class={styles.title}>활동 내역</p>
                <div class={styles.content}>
                  <p
                    class={styles.text}
                    dangerouslySetInnerHTML={circle.value.history.replace(
                      /\n/g,
                      "<br />"
                    )}
                  />
                </div>
              </div>
            </div>
          )}
          {circle.value.award && circle.value.video && (
            <div class={styles.column}>
              {circle.value.video && (
                <div class={styles.video}>
                  <iframe
                    src={
                      "https://www.youtube.com/embed/" +
                      (new URL(circle.value.video).hostname == "www.youtube.com"
                        ? new URL(circle.value.video).searchParams.get("v")
                        : new URL(circle.value.video).pathname.replace("/", ""))
                    }
                    allowFullscreen
                  />
                </div>
              )}
              {circle.value.award && (
                <div class={styles.box}>
                  <p class={styles.title}>수상 내역</p>
                  <div class={styles.content}>
                    {circle.value.award.split("\n").map(
                      (award, index) =>
                        award.trim() && (
                          <div key={index} class={styles.item}>
                            <p>{award.trim().split("|")[2]}</p>
                            <p>{award.trim().split("|")[1]}</p>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
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
  ],
};

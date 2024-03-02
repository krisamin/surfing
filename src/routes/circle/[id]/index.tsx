import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { useStatus, useCircles, useToken } from "../../layout";

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
  const status = useStatus();
  const circle = useCircle();
  const token = useToken();

  const show = useSignal(false);

  if (circle.value.errorMessage) {
    return <p>{circle.value.errorMessage}</p>;
  }
  return (
    <div id="container">
      <div class={[styles.hover, !show.value && styles.hidden]}>
        <div class={styles.window}>
          <div class={styles.header}>
            <div class={styles.left}>
              <div class={styles.close} onClick$={() => {
                show.value = false;
              }} />
              <div class={styles.circle}>
                <img
                  width={32}
                  height={32}
                  class={styles.logo}
                  crossOrigin="anonymous"
                  src={`${import.meta.env.PUBLIC_API_URL}/assets/${circle.value.logo}`}
                />
                <div class={styles.info}>
                  <p class={styles.name}>{circle.value.name}</p>
                  <p class={styles.label}>지원하기</p>
                </div>
              </div>
            </div>
            <div class={styles.warning}>
              <div class={styles.icon} />
              <p>작성하신 내용은 자동으로 저장되지 않습니다</p>
            </div>
          </div>
          <div class={styles.content}>
            <div class={styles.item}>
              <p class={styles.title}>지원하게 된 동기를 알려주세요.</p>
              <textarea
                class={styles.input}
                placeholder="최대 300자로 작성해주세요."
              />
            </div>
            <div class={styles.item}>
              <p class={styles.title}>
                하고 싶은 일과 앞으로의 목표를 알려주세요.
              </p>
              <textarea
                class={styles.input}
                placeholder="최대 300자로 작성해주세요."
              />
            </div>
            <div class={styles.item}>
              <p class={styles.title}>
                자기계발을 위해 내가 한 노력을 알려주세요.
              </p>
              <textarea
                class={styles.input}
                placeholder="최대 300자로 작성해주세요."
              />
            </div>
            <div class={styles.item}>
              <p class={styles.title}>
                자신의 장단점을 성격과 생활태도를 중심으로 알려주세요.
              </p>
              <textarea
                class={styles.input}
                placeholder="최대 300자로 작성해주세요."
              />
            </div>
          </div>
          <div class={styles.footer}>
            <div class={styles.submit}>
              <p>제출하기</p>
            </div>
            <div class={styles.warning}>
              <div class={styles.icon} />
              <p>제출하시면 내용을 변경할 수 없습니다</p>
            </div>
          </div>
        </div>
      </div>
      <div class={styles.header}>
        <div class={styles.content}>
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
        {token.value && (
          <div
            class={[
              styles.submit,
              status.value !== "SUBMIT" && styles.disabled,
            ]}
            onClick$={() => {
              show.value = true;
            }}
          >
            <p>지원하기 {show.value}</p>
          </div>
        )}
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

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";

import styles from "~/styles/index.module.scss";

const qna = [
  {
    question: "사이트에 관한 질문은 어디로 문의하면 되나요?",
    answer:
      "이 사이트는 디미고 인트라넷 개발팀, DIN에서 개발했어요. 따라서, DIN 공식 인스타그램인 @dimigo.din이나 디미고 인트라넷 밴드 채팅을 이용해주세요. 최대한 빨리 답변해드릴게요!",
  },
  {
    question: "합격 여부는 어떻게 알 수 있나요?",
    answer:
      "동아리 목록 페이지에서 내가 지원한 동아리가 모두 표시됩니다! 서류 및 면접 결과가 나오게 되면, 그에 따라 “1차 합격”, “최종 합격”, “불합격” 등 메시지가 표시되게 됩니다. 행운을 빔니다!",
  },
  {
    question: "면접은 어떻게 진행하나요?",
    answer:
      "면접은 서류 면접 이후, 각 동아리에서 개별적으로 면접 일정을 공지할 예정입니다! 동아리에서 개별 연락이 갈 예정이니, 1차 합격 후 각 동아리들과 연락망을 반드시 유지해주세요!",
  },
  {
    question: "모든 동아리에서 불합격되면 어떻게 하나요?",
    answer:
      "모든 동아리가 불합격 된 학생(3떨)들을 인원 적은 동아리부터 랜덤으로 배치할 예정입니다! 일반 동아리는 모든 학생들이 필수로 참여해야 하는 활동이니, 원하는 동아리에서 활동을 못 할 수 있다는 점 유의 바랍니다!",
  },
];

export default component$(() => {
  return (
    <div class={styles.container}>
      <div class={[styles.background, styles.start]} />
      <div class={styles.inner}>
        <div class={styles} />
        <div class={styles.about}>
          <div class={styles.mix}>
            <p class={styles.title}>전시회 소개</p>
            <div class={styles.slogun}>
              <p>파도를 헤엄치다,</p>
              <div class={styles.logo} />
            </div>
          </div>
          <div class={styles.line} />
          <p class={styles.content}>
            surfing은 <span>한국디지털미디어고등학교 동아리 전시회</span>
            입니다. surfing은 동아리 간의 활동 결과를 공유하여{" "}
            <span>
              보다 건전한 동아리 문화를 조성하고 이를 기념하기 위해
            </span>{" "}
            만들어졌습니다
          </p>
        </div>
        <div class={styles.qna}>
          <p class={styles.title}>자주 묻는 질문</p>
          <div class={styles.grid}>
            {qna.map((item, index) => (
              <div key={index} class={styles.item}>
                <p class={styles.question}>{item.question}</p>
                <p class={styles.answer}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class={[styles.background, styles.end]} />
      <div class={styles.next}>
        <p class={styles.title}>동아리 전시회 & 원서 접수</p>
        <Link class={styles.button} href="/circle">보러 가기</Link>
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
      name: "og:description",
      content: "한국디지털미디어고등학교 동아리 전시회",
    },
  ],
};

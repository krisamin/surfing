import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import styles from "~/styles/footer.module.scss";

export const Footer = component$(() => {
  const loc = useLocation();

  return (
    <div
      class={[
        styles.footer,
        loc.url.pathname == "/" ? styles.fill : styles.glass,
      ]}
    >
      <div class={styles.inner}>
        <div class={styles.brand}>
          <div class={styles.logo} />
          <p class={styles.name}>한국디지털미디어고등학교 동아리 전시회</p>
        </div>
        <div class={styles.special}>
          <p class={styles.title}>주관 & 운영</p>
          <p class={styles.name}>DIN, 디미고 인트라넷 개발팀</p>
        </div>
      </div>
    </div>
  );
});

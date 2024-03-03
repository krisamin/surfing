import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useToken } from "~/routes/layout";

import styles from "~/styles/navbar.module.scss";

export const Navbar = component$(() => {
  const loc = useLocation();
  const token = useToken();

  return (
    <div
      class={[
        styles.navbar,
        loc.url.pathname == "/" ? styles.fill : styles.glass,
      ]}
    >
      <div class={styles.inner}>
        <Link class={styles.logo} href="/" prefetch />
        <div class={styles.mix}>
          <Link
            class={[
              styles.item,
              loc.url.pathname == "/circle/" ? styles.select : null,
            ]}
            href="/circle"
            prefetch
          >
            <p>동아리 목록</p>
          </Link>
          {token.value && token.value.user.admin && (
            <Link
              class={[
                styles.item,
                loc.url.pathname == "/admin/" ? styles.select : null,
              ]}
              href="/admin"
            >
              <p>신청 관리</p>
            </Link>
          )}
          {token.value ? (
            <Link class={styles.item} href="/auth" prefetch={false}>
              <p>{token.value.user.name} 님</p>
            </Link>
          ) : (
            <Link
              class={styles.item}
              href={`https://dimigo.in/auth?client=65dd60220b635e83a1e091cd&redirect=${import.meta.env.PUBLIC_API_URL}/auth`}
            >
              <p>로그인</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});

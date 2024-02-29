import { component$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

import styles from '~/styles/navbar.module.scss';
 
export const Navbar = component$(() => {
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <div class={[styles.navbar, loc.url.pathname == "/" ? styles.fill : styles.glass]}>
      <div class={styles.inner}>
        <div class={styles.logo} onClick$={() => nav("/")} />
        <div class={styles.mix}>
          <div class={[styles.item, loc.url.pathname == "/circle/" ? styles.select : null]} onClick$={() => nav("/circle")}>
            <p>동아리 목록</p>
          </div>
          <div class={styles.item}>
            <p>신청 관리</p>
          </div>
          <div class={styles.item} onClick$={() => nav(`https://dimigo.in/auth?client=65dd60220b635e83a1e091cd&redirect=${import.meta.env.PUBLIC_API_URL}/auth`)}>
            <p>로그인</p>
          </div>
        </div>
      </div>
    </div>
    );
});
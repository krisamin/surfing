import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import type { Circle } from "~/types";
import { jwtDecode } from "jwt-decode";

export const useStatus = routeLoader$(async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/status`);
  const status = (await response.text()) as "SUBMIT" | "FIRST" | "SECOND" | "FINAL" | "EOL";
  return status;
});

export const useCircles = routeLoader$(async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/circle`);
  const circles = (await response.json()) as Circle[];
  return circles;
});

export const useToken = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("token");
  if (token) {
    const [access, refresh] = token.value.split(" ");

    const user = jwtDecode<{
      name: string;
      exp: number;
    }>(access);

    return { access, refresh, user };
  } else {
    return null;
  }
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <Slot />
      <Footer />
    </>
  );
});

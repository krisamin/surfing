import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import type { Circle } from "~/types";

export const useCircles = routeLoader$(async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/circle`);
  const circles = (await response.json()) as Circle[];
  return circles;
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

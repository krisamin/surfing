import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import type { Circle, Submit } from "~/types";
import { jwtDecode } from "jwt-decode";

export const useStatus = routeLoader$(async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/status`);
  const status = (await response.text()) as
    | "SUBMIT"
    | "FIRST"
    | "SECOND"
    | "FINAL"
    | "EOL";
  return status;
});

export const useCircles = routeLoader$(async (requestEvent) => {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/circle`);
  const circles = (await response.json()) as Circle[];

  let rand;
  try {
    rand = JSON.parse(requestEvent.cookie.get("rand")?.value || "{}");
  } catch (e) {
    rand = {};
  }

  for (const circle of circles) {
    if (!rand[circle._id]) {
      rand[circle._id] = Math.random();
    }
    circle.rand = rand[circle._id];
  }

  requestEvent.cookie.set("rand", rand, {
    httpOnly: true,
    path: "/",
  });
  circles.sort((a, b) => a.rand - b.rand);

  return circles;
});

export const useToken = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("token");
  if (token) {
    const [access, refresh] = token.value.split(" ");

    const user = jwtDecode<{
      name: string;
      admin: string;
      exp: number;
    }>(access);

    if (user.exp * 1000 < Date.now()) {
      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: refresh }),
        }
      );
      const newToken = await response.json();
      requestEvent.cookie.set(
        "token",
        [newToken.access, newToken.refresh].join(" "),
        {
          httpOnly: true,
          path: "/",
        }
      );
    }

    return { access, refresh, user };
  } else {
    return null;
  }
});

export const useMy = routeLoader$(async (requestEvent) => {
  const token = await requestEvent.resolveValue(useToken);
  if (!token) {
    return [];
  }

  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/circle/my`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  const my = (await response.json()) as Submit[];
  return my;
});

export const useAdmin = routeLoader$(async (requestEvent) => {
  const token = await requestEvent.resolveValue(useToken);
  if (!token) {
    return [];
  }

  const response = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/circle/admin`,
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  const admin = (await response.json()) as Submit[];
  return admin;
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

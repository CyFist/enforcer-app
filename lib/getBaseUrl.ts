import { cache } from "react";

export const getBaseUrl = cache(() =>
  process.env.VERCEL_URL
    ? `https://enforcer.vercel.app`
    : `http://localhost:${process.env.PORT ?? 3000}`,
);

"use client";

import { RecoilRoot } from "recoil";
import AppThemeProvider from "../theme/ThemeProvider.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";

import createEmotionCache from "../theme/createEmotionCache";
import { CacheProvider } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

export default function Layouthelper({ children }) {
  return (
    <RecoilRoot>
      <CacheProvider value={clientSideEmotionCache}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}

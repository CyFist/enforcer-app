"use client";

import { RecoilRoot } from "recoil";
import AppThemeProvider from "../theme/CssVarsProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";

export default function Layouthelper({ children }) {
  return (
    <RecoilRoot>
        <AppThemeProvider>{children}</AppThemeProvider>
    </RecoilRoot>
  );
}

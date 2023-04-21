"use client";

import React, { ReactElement, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { appThemeMode } from "./theme-atoms";
import { dark, light } from "./customtheme";

interface Props {
  children: ReactElement;
}

function AppThemeProvider({ children }: Props): ReactElement {
  const mode = useRecoilValue(appThemeMode);
  const theme = useMemo(
    () => createTheme(mode === "dark" ? dark : light),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;

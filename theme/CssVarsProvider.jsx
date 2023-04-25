"use client";

import React, { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import { myTheme } from "./customtheme";

function AppThemeProvider({ children }) {
  const theme = extendTheme(myTheme);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}

export default AppThemeProvider;

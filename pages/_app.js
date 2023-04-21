import { RecoilRoot } from "recoil";
import AppThemeProvider from "../theme/ThemeProvider.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";

import createEmotionCache from "../theme/createEmotionCache";
import { CacheProvider } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {


  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <AppThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}

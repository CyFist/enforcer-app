import { RecoilRoot } from "recoil";
import AppThemeProvider from "../theme/ThemeProvider.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";
import Realtime from "../components/realtime";
import ReactPWAInstallProvider from "lib/InstallPWA/Index";

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
          <ReactPWAInstallProvider>
            <Layout>
              <Realtime />
              <Component {...pageProps} />
            </Layout>
          </ReactPWAInstallProvider>
        </AppThemeProvider>
      </CacheProvider>
    </RecoilRoot>
  );
}

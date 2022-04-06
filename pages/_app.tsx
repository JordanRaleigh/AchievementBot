import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // <ThemeProvider theme={theme}>
    <CookiesProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />;
      </SessionProvider>
    </CookiesProvider>
    //  </ThemeProvider>
  );
}

export default MyApp;

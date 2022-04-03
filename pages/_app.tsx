import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <CookiesProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />;
      </SessionProvider>
    </CookiesProvider>
  );
}

export default MyApp;

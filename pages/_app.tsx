import type { AppProps } from "next/app";
import Head from "next/head";
import { Button } from "@mui/material";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    region: "ap-northeast-1",
    userPoolId: process.env.NEXT_PUBLIC_AMPLIFY_USERPOOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AMPLIFY_USERPOOL_WEB_CLIENT_ID,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return process.env.NODE_ENV === "development" ? (
    <>
      <Head>Liking</Head>
      <Component {...pageProps} />
      <Button>Logout</Button>
    </>
  ) : (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <Head>Liking</Head>
          <Component {...pageProps} />
          <Button onClick={signOut}>Logout</Button>
        </>
      )}
    </Authenticator>
  );
}

export default MyApp;

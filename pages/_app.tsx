import type { AppProps } from "next/app";
import Head from "next/head";
import { Button } from "@mui/material";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_****",
    userPoolWebClientId: "****",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
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

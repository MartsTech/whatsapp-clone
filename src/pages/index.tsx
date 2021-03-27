import Head from "next/head";
import React from "react";
import Sidebar from "../components/Sidebar";
import { withAuthUser, AuthAction } from "next-firebase-auth";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Whatsapp clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);

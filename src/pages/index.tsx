import Head from "next/head";
import React from "react";
import { useIsAuth } from "../utils/useIsAuth";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {
  useIsAuth();

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

export default Home;

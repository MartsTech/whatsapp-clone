import { AppProps } from "next/app";
import React, { Fragment } from "react";
import { createGlobalStyle } from "styled-components";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  );
};

export default MyApp;

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;

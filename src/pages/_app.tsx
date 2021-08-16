import { defaultSEO } from "config/seo";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { store, StoreContext } from "stores/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreContext.Provider value={store}>
      <DefaultSeo {...defaultSEO} />
      <Component {...pageProps} />
    </StoreContext.Provider>
  );
};

export default App;

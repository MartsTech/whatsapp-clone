import { defaultSEO } from "config/seo";
import AuthProvider from "modules/auth/AuthProvider";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { store, StoreContext } from "stores/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreContext.Provider value={store}>
      <AuthProvider>
        <DefaultSeo {...defaultSEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </StoreContext.Provider>
  );
};

export default App;

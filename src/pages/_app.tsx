import type { AppProps } from "next/app";
import Layout from "./layout";
import "../style/globals.scss";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

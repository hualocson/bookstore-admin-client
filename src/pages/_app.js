import CustomToastContainer from "@/components/ui/CustomToastContainer";
import store from "@/store";
import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{"Admin Bookstore"}</title>
      </Head>
      <Provider store={store}>
        <NextUIProvider>
          <Component {...pageProps} />
          <CustomToastContainer />
        </NextUIProvider>
      </Provider>
    </>
  );
}

export default MyApp;

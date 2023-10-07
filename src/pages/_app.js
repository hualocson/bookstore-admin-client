import CustomToastContainer from "@/components/ui/CustomToastContainer";
import store from "@/store";
import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{"Admin Bookstore"}</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
        <CustomToastContainer />
      </Provider>
    </>
  );
}

export default MyApp;

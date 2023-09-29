import CustomToastContainer from "@/components/ui/CustomToastContainer";
import store from "@/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <CustomToastContainer />
    </Provider>
  );
}

// MyApp.getInitialProps = async ({ ctx }) => {
//   if (ctx.res === undefined) {
//     return {
//       pageProps: {
//         user: undefined,
//       },
//     };
//   }

//   const userStr = ctx.res.getHeader("user");
//   let user = undefined;
//   if (userStr) {
//     user = JSON.parse(userStr);
//   }

//   // console.log("[APP LOG]", router.pathname, user)

//   return {
//     pageProps: {
//       user: user,
//     },
//   };
// };

export default MyApp;

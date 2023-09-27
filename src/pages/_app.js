import "@/styles/globals.css";
import MainLayout from "@/components/layouts/layout";

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
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

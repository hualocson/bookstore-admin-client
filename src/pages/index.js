import LoginForm from "@/components/auth/LoginForm";
import { authApi } from "@/apis";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  return <LoginForm />;
};

export async function getServerSideProps(ctx) {
  try {
    const { error } = await authApi.getAdminDataSSR(ctx);
    if (!error) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default Home;

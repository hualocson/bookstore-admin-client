import LoginForm from "@/components/auth/LoginForm";
import axios from "axios";

const Home = ({ response }) => {
  console.log({ response });
  return <LoginForm />;
};

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;

  if (cookie === undefined)
    return {
      props: {},
    };

  try {
    const response = await axios.post(
      "http://admin-be:8099/api/admin/v1/auth/verify",
      {},
      { headers: { cookie } }
    );

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default Home;

import useSWR from "swr";
import fetcher from "@/apis/swrFetcher";

const useAuth = () => {
  const { data, error, isLoading, isValidating } = useSWR(
    "/auth",
    fetcher().get
  );

  return {
    user: data?.payload,
    isLoading,
    isValidating,
    error,
  };
};

export default useAuth;

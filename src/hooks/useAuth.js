import useSWR from "swr";
import fetcher from "@/apis/swrFetcher";

const useAuth = () => {
  const { data, error, isLoading } = useSWR("/auth/verify", fetcher().post);

  return {
    user: data?.payload,
    isLoading,
    error,
  };
};

export default useAuth;

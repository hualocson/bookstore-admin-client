import useSWR from "swr";
import fetcher from "@/apis/swrFetcher";

const useAssets = () => {
  const { data, error, isLoading, mutate } = useSWR("/assets", fetcher().get);

  return {
    data: data?.assets ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useAssets;

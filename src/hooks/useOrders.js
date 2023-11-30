import useSWR from "swr";
import fetcher from "@/apis/swrFetcher";

const useOrders = () => {
  const { data, error, isLoading, mutate } = useSWR("/orders", fetcher().get);

  return {
    data: data?.orders ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useOrders;

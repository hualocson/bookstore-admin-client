import useSWR from "swr";
import fetcher from "@/apis/swrFetcher";

const useOrderStatsToday = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/orders/stats/today",
    fetcher().get
  );

  return {
    data: data?.orderStats ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useOrderStatsToday;

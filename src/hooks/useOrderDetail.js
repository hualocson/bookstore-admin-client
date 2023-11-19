import useSWR from "swr";
import fetcher from "@/apis/swrFetcher";

const useOrderDetail = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ["/orders", [id]] : null,
    fetcher().getWithParams
  );

  return {
    data: data?.orderItems ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useOrderDetail;

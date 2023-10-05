import useSWR from "swr";
import fetcher from "@/apis/swrFetcher";

const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/categories",
    fetcher().get
  );

  return {
    data: data?.categories ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useCategories;

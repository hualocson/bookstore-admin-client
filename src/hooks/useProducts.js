import fetcher from "@/apis/swrFetcher";
import useSWR from "swr";

const validFilter = ["active", "inactive"];

const useProducts = (filter = undefined) => {
  let key;

  if (!validFilter.includes(filter)) {
    key = "/products";
  } else {
    key = `/products?filter=${filter}`;
  }

  const { data, error, isLoading, mutate } = useSWR(key, fetcher().get);

  return {
    data: data?.products ?? [],
    isLoading,
    error,
    mutate,
  };
};

export default useProducts;

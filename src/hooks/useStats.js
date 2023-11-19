import useSWR from "swr";
import fetcher from "@/apis/swrFetcher";

/**
 * @typedef Stats
 * @property {string} totalOrders
 * @property {string} totalCustomers
 * @property {string} totalRevenue
 * @property {Object} topSellingProducts
 */
const useStats = () => {
  const { data, error, isLoading, mutate } = useSWR("/stats", fetcher().get);

  return {
    /** @type Stats */
    data: data?.stats,
    isLoading,
    error,
    mutate,
  };
};

export default useStats;

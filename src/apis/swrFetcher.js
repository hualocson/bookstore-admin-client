import axiosInstance from "./axiosConfigs";

/**
 *
 * @description This fetcher is used to fetch data from the API. It is used in the SWR hook. (SWR syntax)
 * @refercence https://swr.vercel.app/docs/arguments#fetcher
 *
 */
const fetcher = () => {
  const apiInstance = axiosInstance;
  return {
    get: async (...args) => apiInstance.get(...args).then((res) => res),
    // SWR ex: useSWR(['/gamer-center/rosters/get-upcoming-matches', [matchId]], fetcher().getWithParams)
    getWithParams: async ([url, params]) => {
      let paramString = `${url}/${params.join("/")}`;
      return apiInstance.get(paramString).then((res) => res);
    },

    post: async (...args) => apiInstance.post(...args).then((res) => res),
    put: async (...args) => apiInstance.put(...args).then((res) => res),
    delete: async (...args) => apiInstance.delete(...args).then((res) => res),
  };
};

export default fetcher;

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

/**
 * @typedef {object} ErrorResponseObject
 * @property {string} message - The response message
 * @property {number} statusCode - The response status code
 *
 * Handles error responses from internal API requests.
 * @param {AxiosError} error - The error object returned by Axios or a similar HTTP client.
 * @returns {ErrorResponseObject} An object containing error information.
 */
export const handleErrorResponse = (error) => {
  if (error.response) {
    // The request was made, and the server responded with a status code that falls out of the range of 2xx.
    const { data, status } = error.response;

    // log error
    console.error("Get response error: ", error.response);

    return {
      message: data.error?.message ?? "Something went wrong",
      statusCode: status || 400,
    };
  } else if (error.request) {
    // The request was made, but no response was received.
    console.error("No response received: ", error.request);
    return {
      message: "No response received",
      statusCode: 400,
    };
  } else {
    // Something happened while setting up the request that triggered an error.
    console.error(
      "Something happened while setting up the request: ",
      error.message
    );
    return {
      message: "Something happened while setting up the request",
      statusCode: 400,
    };
  }
};

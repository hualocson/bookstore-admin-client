import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

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
export const priceFormatter = (price = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price / 100
  );

export function hashText(text) {
  const hash = CryptoJS.SHA256(text);
  return hash.toString(CryptoJS.enc.Hex);
}

export function verifyHashedText(text, hashedText) {
  return hashText(text) === hashedText;
}

export const getLastCharacters = (str, limit = 10) => {
  if (typeof str !== "string") {
    return str;
  }

  // Get the length of the string
  var length = str.length;

  // If the length is less than 10, return the entire string
  if (length <= limit) {
    return str;
  }

  // Otherwise, return the last 10 characters
  return str.substring(length - limit);
};

export async function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

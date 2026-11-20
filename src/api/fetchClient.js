// Base API URL
import { API_BASE_URL } from "./endpoints";
import { isTokenExpired } from "./jwtUtils";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
// const API_BASE_URL = "https://cafe-udmy.onrender.com/api";

// const API_BASE_URL = "/api";
// const API_BASE_URL = "http://localhost:8080/api";

// JWT errors returned by the backend
const INVALID_TOKEN_CODES = [
  "INVALID_TOKEN",
  "TOKEN_EXPIRED",
  "INVALID_JWT",
  "JWT_EXPIRED",
  "MALFORMED_TOKEN",
];

const clearAuth = () => {
  const hadAuth = Boolean(localStorage.getItem("token"));

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("floraUserLoggedIn");

  if (hadAuth) {
    window.dispatchEvent(new Event("flora-auth-change"));
  }
};

// Parse response safely
async function parseResponse(response) {
  if ([204, 205].includes(response.status)) return null;

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  return response.text();
}

// User-friendly error messages
function getErrorMessage(status, data) {
  if (data && typeof data === "object" && data.message) {
    return data.message;
  }

  const messages = {
    400: "Invalid request. Please check your input.",
    401: "Your session has expired. Please log in again.",
    403: "You don't have permission to perform this action.",
    404: "The requested resource was not found.",
    409: "This action conflicts with existing data.",
    422: "Unable to process your request.",
    429: "Too many requests. Please try again later.",
    500: "Something went wrong on the server.",
    502: "Server is temporarily unavailable. Please try again.",
    503: "Server is temporarily unavailable. Please try again.",
    504: "Server is temporarily unavailable. Please try again.",
  };
  return messages[status] || `Request failed (${status}).`;
}

export async function fetchClient(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
    auth = true,
    ...fetchOptions
  } = options;

  const requestHeaders = new Headers(headers);

  // Attach JWT only when authentication is enabled
  if (auth) {
    const token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      clearAuth();

      const error = new Error("Your session has expired. Please log in again.");

      error.name = "ApiError";
      error.status = 401;
      error.code = "TOKEN_EXPIRED";
      error.endpoint = endpoint;
      error.method = method;

      throw error;
    }

    if (token && !requestHeaders.has("Authorization")) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  } else {
    requestHeaders.delete("Authorization");
  }

  let requestBody;

  if (
    body instanceof FormData ||
    body instanceof Blob ||
    typeof body === "string"
  ) {
    requestBody = body;
  } else if (body != null) {
    requestHeaders.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  let response;
  let data;

  try {
    response = await fetch(url, {
      ...fetchOptions,
      method,
      headers: requestHeaders,
      body: requestBody,
      signal,
    });

    data = await parseResponse(response);
  } catch (error) {
    // Do not treat aborted requests as API failures
    if (error.name === "AbortError") throw error;

    const networkError = new Error(
      "Unable to connect to the server. Please check your internet connection.",
    );

    networkError.name = "NetworkError";
    networkError.cause = error;

    console.error(`Network Error [${method} ${endpoint}]:`, error.message);

    throw networkError;
  }

  // Handle HTTP errors
  if (!response.ok) {
    const code = data?.code ?? null;

    const isInvalidToken =
      response.status === 401 || INVALID_TOKEN_CODES.includes(code);

    if (auth && isInvalidToken) {
      clearAuth();
    }

    const error = new Error(getErrorMessage(response.status, data));

    Object.assign(error, {
      name: "ApiError",
      status: response.status,
      code,
      data,
      endpoint,
      method,
    });

    console.error(`API Error [${method} ${endpoint}]:`, {
      status: response.status,
      code,
      message: error.message,
      data,
    });

    throw error;
  }

  return data;
}

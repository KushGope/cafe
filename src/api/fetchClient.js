// Base API URL
import { API_BASE_URL } from "./endpoints";

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
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  return await response.text();
}

// User-friendly error messages
function getErrorMessage(status, data) {
  if (data && typeof data === "object" && data.message) {
    return data.message;
  }

  switch (status) {
    case 400:
      return "Invalid request. Please check your input.";

    case 401:
      return "Your session has expired. Please log in again.";

    case 403:
      return "You don't have permission to perform this action.";

    case 404:
      return "The requested resource was not found.";

    case 409:
      return "This action conflicts with existing data.";

    case 422:
      return "Unable to process your request.";

    case 429:
      return "Too many requests. Please try again later.";

    case 500:
      return "Something went wrong on the server.";

    case 502:
    case 503:
    case 504:
      return "Server is temporarily unavailable. Please try again.";

    default:
      return `Request failed (${status}).`;
  }
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

    if (token && !requestHeaders.has("Authorization")) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  } else {
    requestHeaders.delete("Authorization");
  }

  let requestBody;

  if (body !== undefined && body !== null) {
    if (body instanceof FormData || body instanceof Blob) {
      requestBody = body;
    } else if (typeof body === "string") {
      requestBody = body;
    } else {
      requestHeaders.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    }
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
    if (error.name === "AbortError") {
      throw error;
    }

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
    const code = typeof data === "object" && data !== null ? data.code : null;

    const isInvalidToken =
      response.status === 401 ||
      (response.status === 403 && INVALID_TOKEN_CODES.includes(code));

    // Clear authentication only for actual authentication failures
    if (isInvalidToken && auth) {
      clearAuth();
    }

    const error = new Error(getErrorMessage(response.status, data));

    error.name = "ApiError";
    error.status = response.status;
    error.code = code;
    error.data = data;
    error.endpoint = endpoint;
    error.method = method;

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

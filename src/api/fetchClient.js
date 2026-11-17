// Base API URL
import { API_BASE_URL } from "./endpoints";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
// const API_BASE_URL = "https://cafe-udmy.onrender.com/api";

// const API_BASE_URL = "/api";
// const API_BASE_URL = "http://localhost:8080/api";

/**
 * Modular fetch client for Spring Boot backend
 * @param {string} endpoint - API endpoint (e.g., '/orders')
 * @param {Object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>}
 */

export async function fetchClient(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
    ...fetchOptions
  } = options;

  const requestHeaders = new Headers(headers);

  //  customer JWT authentication
  const token = localStorage.getItem("token");

  if (token && !requestHeaders.has("Authorization")) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  let requestBody;

  // Attach body if present and serialize to JSON
  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      requestBody = body;
      // Browser automatically sets multipart boundary.
    } else if (typeof body === "string" || body instanceof Blob) {
      requestBody = body;
    } else {
      requestHeaders.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    }
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      method,
      headers: requestHeaders,
      body: requestBody,
      signal,
    });

    // Handle empty response
    if (response.status === 204 || response.status === 205) {
      return null;
    }

    // Automatically parse JSON if the response contains it, otherwise return text
    // Parse response
    const contentType = response.headers.get("content-type") || "";
    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    // Handle HTTP errors
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("floraUserLoggedIn");
        window.dispatchEvent(new Event("flora-auth-change"));
      }
      const message =
        typeof data === "string"
          ? data || `Request failed (${response.status})`
          : data?.message || `Request failed (${response.status})`;

      const error = new Error(message);
      error.status = response.status;
      error.data = data;

      throw error;
    }
    return data;
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error.message);
    throw error;
  }
}

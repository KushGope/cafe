// const API_BASE_URL = import.meta.env.DEV
//   ? "http://localhost:8080/api"
//   : "https://cafe-udmy.onrender.com/api";

// export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
export const API_BASE_URL = "https://cafe-udmy.onrender.com/api";

export const API_ENDPOINTS = {
  // Admin
  // ADMIN_DASHBOARD: `${API_BASE_URL}/admin/dashboard`,

  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },

  SHOP: {
    STATUS: "/shop/status",
    UPDATE_STATUS: "/admin/shop/status",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
  },

  ORDERS: {
    BASE: "/orders",
  },

  CUSTOMERS: {
    BASE: "/menu",
  },
};

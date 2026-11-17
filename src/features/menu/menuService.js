import { fetchClient } from "../../api/fetchClient";

// Fetch all menu items from PostgreSQL through Spring Boot
export const getAllMenuItems = async () => {
  return await fetchClient("/menu");
};

// Fetch only available menu items
export const getAvailableMenuItems = async () => {
  return await fetchClient("/menu/available");
};

// Fetch a particular menu item
export const getMenuItemById = async (id) => {
  return await fetchClient(`/menu/${id}`);
};

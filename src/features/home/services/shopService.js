import { fetchClient } from "../../../api/fetchClient";
import { API_ENDPOINTS } from "../../../api/endpoints";

/**
 * Get current shop availability
 */
export const getShopStatus = () => {
  return fetchClient(API_ENDPOINTS.SHOP.STATUS);
};

/**
 * Update shop availability (admin only)
 */
export const updateShopStatus = (open) => {
  return fetchClient(API_ENDPOINTS.SHOP.UPDATE_STATUS, {
    method: "PUT",
    body: { open },
  });
};

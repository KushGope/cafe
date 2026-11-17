import { fetchClient } from "../../api/fetchClient";

export const getAllCustomers = async () => {
  return await fetchClient("/admin/customers");
};

export const getAllOrders = async () => {
  return await fetchClient("/admin/orders");
};

export const updateOrderStatus = async (orderId, status) => {
  return await fetchClient(`/admin/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

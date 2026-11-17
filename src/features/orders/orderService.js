import { fetchClient } from "../../api/fetchClient";

// Get order by token
export const getOrderByToken = async (orderToken) => {
  if (!orderToken) throw new Error("Order token is required");

  return await fetchClient(`/orders/token/${orderToken}`);
};

// Create order
export const placeOrder = async (orderData) => {
  return await fetchClient("/orders", {
    method: "POST",
    body: orderData,
  });
};

// Get past orders for a customer
export const getMyOrders = async () => {
  return await fetchClient("/orders/myorders");
};

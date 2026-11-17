export const ORDER_STATUSES = [
  {
    value: "PENDING",
    label: "Order Placed",
    icon: "✓",
    message: "We have received your order.",
  },
  {
    value: "CONFIRMED",
    label: "Confirmed",
    icon: "✓",
    message: "Your order has been confirmed by Flora Cafe.",
  },
  {
    value: "PREPARING",
    label: "Preparing",
    icon: "☕",
    message: "Our chef is preparing your delicious food.",
  },
  {
    value: "READY",
    label: "Ready for Pickup",
    icon: "♨",
    message: "Your order is ready for pickup.",
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: "✓",
    message: "Your order has been successfully delivered. Enjoy!",
  },
];

export const getOrderStatus = (status) => {
  const index = ORDER_STATUSES.findIndex((item) => item.value === status);

  return {
    index: index === -1 ? 0 : index,
    details: ORDER_STATUSES[index] || ORDER_STATUSES[0],
    isCancelled: status === "CANCELLED",
  };
};

export const formatOrderDate = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleString();
};

export const formatAmount = (amount) => {
  const value = Number(amount);

  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
};

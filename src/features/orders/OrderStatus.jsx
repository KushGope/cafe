const OrderStatus = ({ status, message, isCancelled }) => {
  return (
    <div
      className={`rounded-xl p-5 ${
        isCancelled ? "bg-red-50" : "bg-background"
      }`}
    >
      <p className="text-sm text-gray-500">Current Order Status</p>

      <h2
        className={`mt-2 text-2xl font-bold ${
          isCancelled ? "text-red-600" : "text-primary"
        }`}
      >
        {isCancelled ? "Order Cancelled" : status}
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        {isCancelled ? "Your order has been cancelled." : message}
      </p>
    </div>
  );
};

export default OrderStatus;

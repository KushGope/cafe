const OrderInformation = ({ order }) => {
  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <h3 className="mb-5 text-xl font-bold">Order Information</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="break-all font-semibold">{order.id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Payment Status</p>
          <p className="font-semibold">
            {order.paymentStatus || "Not available"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Order Type</p>
          <p className="font-semibold">{order.orderType || "Cafe Pickup"}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;

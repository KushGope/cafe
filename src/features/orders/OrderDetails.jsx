import { formatAmount, formatOrderDate } from "../../utils/orderUtils";

const OrderDetails = ({ order, currentStatus }) => {
  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <h3 className="mb-5 text-xl font-bold">Order Details</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="font-semibold">Order Token</span>
          <span className="font-bold text-primary">
            #{order.orderToken ?? "N/A"}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="font-semibold">Order Status</span>
          <span className="font-semibold">{currentStatus}</span>
        </div>

        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="font-semibold">Order Date</span>
          <span className="text-right text-sm">
            {formatOrderDate(order.createdAt)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex justify-between text-lg font-bold">
        <span>Total Amount</span>
        <span className="text-primary">₹{formatAmount(order.totalAmount)}</span>
      </div>
    </div>
  );
};

export default OrderDetails;

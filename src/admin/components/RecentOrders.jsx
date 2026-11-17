import { useEffect, useState } from "react";
import { getAllOrders } from "../services/adminService";
// import { orders } from "../data/adminData";

const capitalizeName = (name) => {
  if (!name) return "N/A";
  return name.trim().toUpperCase();
};

const statusStyles = {
  COMPLETED: "bg-success/10 text-success",
  PENDING: "bg-warning/10 text-warning",
  CONFIRMED: "bg-info/10 text-info",
  PREPARING: "bg-info/10 text-info",
  READY: "bg-success/10 text-success",
  CANCELLED: "bg-error/10 text-error",
};

const RecentOrders = ({ changeTab }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const data = await getAllOrders();

        // Sort by order token (newest first) and get top 5
        const recentOrders = [...data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setOrders(recentOrders);
      } catch (err) {
        console.error("Failed to fetch recent orders:", err);
        setError("Unable to load recent orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">Recent Orders</h3>

        <button
          onClick={() => changeTab("Orders")}
          className="text-sm font-semibold text-primary hover:text-foreground"
        >
          View All
        </button>
      </div>

      {loading ? (
        <p className="py-6 text-center text-text-muted">
          Loading recent orders...
        </p>
      ) : error ? (
        <p className="py-6 text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="py-6 text-center text-text-muted">
          No recent orders found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
            <thead>
              <tr className="border-b border-border text-sm text-text-muted">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Product</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-5 font-semibold">#{order.orderToken}</td>

                  {/* Customer Name */}
                  <td className="py-5 font-medium">
                    {capitalizeName(order.customerName || "Guest")}
                  </td>

                  <td className="py-5">
                    {order.items?.map((item) => (
                      <div key={item.id}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="py-5 font-semibold">
                    ₹{Number(order.totalAmount).toFixed(2)}
                  </td>

                  <td className="py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[order.status] ||
                        "bg-border text-text-muted"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;

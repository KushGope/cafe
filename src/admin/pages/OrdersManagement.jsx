import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/adminService";

const capitalizeName = (name) => {
  if (!name) return "N/A";
  return name.trim().toUpperCase();
};

const statusStyles = {
  PENDING: "bg-warning/10 text-warning ring-1 ring-warning/20",
  CONFIRMED: "bg-info/10 text-info ring-1 ring-info/20",
  PREPARING: "bg-info/10 text-info ring-1 ring-info/20",
  READY: "bg-success/10 text-success ring-1 ring-success/20",
  COMPLETED: "bg-success/10 text-success ring-1 ring-success/20",
  CANCELLED: "bg-error/10 text-error ring-1 ring-error/20",
};

const orderStatuses = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY", "CANCELLED"],
  READY: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        // console.error(data);
        setOrders(data);
      } catch (err) {
        console.error(err);

        if (err.message?.includes("401")) //|| err.message?.includes("401")
        {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // navigate("/login", { state: { from: window.location.pathname } });
        }

        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const previousOrder = orders.find((order) => order.id === orderId);

    if (!previousOrder || previousOrder.status === newStatus) {
      return;
    }

    setUpdatingOrder(orderId);
    setUpdateError("");

    try {
      await updateOrderStatus(orderId, newStatus);

      // Update the UI after successful backend response
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (err) {
      console.error("Failed to update order status:", err);

      setUpdateError(
        err.message || `Failed to update order #${previousOrder.orderToken}.`,
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  //TODO: sorting by createdAt.
  // const sortedOrders = [...orders].sort((a, b) => b.orderToken - a.orderToken);
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Orders</h2>
          <p className="mt-1 text-sm text-text-muted">
            Manage all Flora Cafe orders
          </p>
        </div>

        <span className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold">
          {orders.length} Orders
        </span>
      </div>

      {updateError && (
        <p className="mb-4 text-sm text-red-500">{updateError}</p>
      )}

      {orders.length === 0 ? (
        <p className="py-10 text-center text-text-muted">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead>
              <tr className="border-b border-border bg-background/70 text-xs font-bold uppercase tracking-wider text-text-muted">
                <th className="px-3 py-4">Order ID</th>
                <th className="px-3 py-4">Customer</th>
                <th className="px-3 py-4">Products</th>
                <th className="px-3 py-4">Quantity</th>
                <th className="px-3 py-4">Total</th>
                <th className="px-3 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {sortedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0"
                >
                  {/* Order ID */}
                  <td className="px-3 py-5 font-semibold">
                    #{order.orderToken}
                  </td>

                  {/* Customer Name + Phone*/}
                  <td className="px-3 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <span className="text-sm font-bold">
                          {(order.customerName || "G").charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground">
                          {capitalizeName(order.customerName || "Guest")}
                        </span>
                        <span className="text-xs text-text-muted">
                          {order.customerPhone || "Guest order"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Products */}
                  <td className="px-3 py-5">
                    <div className="flex flex-col gap-1">
                      {order.items?.map((item) => (
                        <span key={item.id}>
                          {item.name} x {item.quantity}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Total Quantity */}
                  <td className="px-3 py-5">
                    {order.items?.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    ) || 0}
                  </td>

                  {/* Total Amount */}
                  <td className="px-3 py-5 font-semibold">
                    ₹{Number(order.totalAmount).toFixed(2)}
                  </td>

                  <td className="px-3 py-5">
                    <div className="flex flex-col gap-2">
                      <select
                        value={order.status}
                        disabled={
                          updatingOrder === order.id ||
                          orderStatuses[order.status]?.length === 0
                        }
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className={`w-fit min-w-32 cursor-pointer appearance-none rounded-full border border-transparent px-3 py-2 text-xs font-bold outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-100 ${
                          statusStyles[order.status] ||
                          "bg-border text-text-muted"
                        }`}
                      >
                        <option value={order.status}>{order.status}</option>

                        {(orderStatuses[order.status] || []).map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-surface text-foreground"
                          >
                            {status}
                          </option>
                        ))}
                      </select>

                      {updatingOrder === order.id && (
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                          Updating...
                        </span>
                      )}
                      {/* {orderStatuses[order.status]?.length === 0 && (
                        <span className="text-xs text-text-muted">
                          Final status
                        </span>
                      )} */}
                    </div>
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

export default OrdersManagement;

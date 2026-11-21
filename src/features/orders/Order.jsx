import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
// Utils
import { getOrderStatus } from "../../utils/orderUtils";

// API / Service
import { getMyOrders, getOrderByToken } from "./orderService";

// Components
import OrderProgress from "./OrderProgress";
import OrderStatus from "./OrderStatus";
import OrderDetails from "./OrderDetails";
import OrderInformation from "./OrderInformation";

const REFRESH_INTERVAL = 60 * 1000; // 1 minute

const statusStyles = {
  COMPLETED: "bg-success/10 text-success",
  PENDING: "bg-warning/10 text-warning",
  PROCESSING: "bg-info/10 text-info",
  CANCELLED: "bg-red-100 text-red-700",
};

const Order = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const guestToken = localStorage.getItem("guestOrderToken");
  const [guestOrder, setGuestOrder] = useState(
    location.state?.guestOrder || null,
  );
  const [guestOrderLoading, setGuestOrderLoading] = useState(false);

  const [order, setOrder] = useState(location.state?.order || null);
  const [pastOrders, setPastOrders] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [pastOrdersLoading, setPastOrdersLoading] = useState(
    Boolean(storedUser?.id),
  );

  const orderToken = order?.orderToken;

  useEffect(() => {
    if (storedUser?.id || !guestToken) return;

    let ignore = false;

    const fetchGuestOrder = async () => {
      try {
        setGuestOrderLoading(true);

        const response = await getOrderByToken(guestToken);

        if (!ignore) {
          setGuestOrder(response);
        }
      } catch (error) {
        console.error("Failed to load guest order:", error);
      } finally {
        if (!ignore) {
          setGuestOrderLoading(false);
        }
      }
    };

    setGuestOrderLoading(true);
    fetchGuestOrder();
    const interval = setInterval(fetchGuestOrder, REFRESH_INTERVAL);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [guestToken, storedUser?.id]);

  // 1. Fetch past orders for the logged-in user
  useEffect(() => {
    if (!storedUser?.id) return;

    let ignore = false;
    const fetchUserOrders = async () => {
      try {
        const data = await getMyOrders();
        if (!ignore) {
          const sorted = [...data].sort((a, b) => b.id - a.id);
          setPastOrders(sorted);
          // Update currently tracked order
          setOrder((currentOrder) => {
            if (!currentOrder) return currentOrder;

            const updatedOrder = sorted.find(
              (item) => item.id === currentOrder.id,
            );

            return updatedOrder || currentOrder;
          });
        }
      } catch (err) {
        console.error("Failed to load past orders:", err);
        if (err.message.includes("403") || err.message.includes("401")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } finally {
        if (!ignore) setPastOrdersLoading(false);
      }
    };

    fetchUserOrders();
    // Automatically refresh every 3 minutes
    const interval = setInterval(fetchUserOrders, REFRESH_INTERVAL);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [storedUser?.id]);

  const currentStatus = order?.status || "PENDING";
  const orderStatusInfo = order ? getOrderStatus(currentStatus) : null;
  const activeStatus = orderStatusInfo?.index;
  const statusDetails = orderStatusInfo?.details;
  const isCancelled = orderStatusInfo?.isCancelled;

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">
            FLORA CAFE / ORDERS & TRACKING
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            {order ? "Track Your Order" : "My Order History"}
          </h1>
          <p className="mt-2 text-gray-500">
            {storedUser
              ? `Welcome back, ${storedUser.name}!`
              : "Manage and track your cafe orders."}
          </p>
        </div>

        {/* GUEST ORDER TRACKING */}
        {!storedUser && (
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-bold">Guest Order Status</h2>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
              {guestOrderLoading ? (
                <p className="py-4 text-center text-text-muted">
                  Loading your order status...
                </p>
              ) : guestOrder ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-text-muted">Order Token</p>

                      <h3 className="mt-1 text-2xl font-bold">
                        #{guestOrder.orderToken}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        statusStyles[guestOrder.status] ||
                        "bg-primary/10 text-primary"
                      }`}
                    >
                      {guestOrder.status}
                    </span>
                  </div>

                  <div className="mt-6 border-t border-border pt-5">
                    <p className="text-sm text-text-muted">Order Amount</p>

                    <p className="mt-1 text-xl font-bold">
                      ₹{Number(guestOrder.totalAmount || 0).toFixed(2)}
                    </p>

                    <p className="mt-3 text-sm text-text-muted">
                      Placed on:{" "}
                      {new Date(guestOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                </>
              ) : guestToken ? (
                <p className="py-4 text-center text-text-muted">
                  Unable to load your order status. Please try again.
                </p>
              ) : (
                <p className="py-4 text-center text-text-muted">
                  You haven't placed a guest order yet.
                </p>
              )}
            </div>
          </div>
        )}

        {/* SECTION 1: ONGOING ORDER (Loaded directly from state) */}
        {order && (
          <div className="mb-12">
            <h2 className="mb-4 text-xl font-bold">Ongoing Order</h2>
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <h3 className="mt-1 break-all text-xl font-bold">
                    #{order.id}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Token: #{orderToken ?? "N/A"}
                    {/* order.orderToken; */}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    statusStyles[currentStatus] || "bg-primary/10 text-primary"
                  }`}
                >
                  {currentStatus}
                </span>
              </div>

              {/* Progress Tracker */}
              <OrderProgress
                activeStatus={activeStatus}
                isCancelled={isCancelled}
              />

              {/* Current Status Message */}
              <OrderStatus
                status={statusDetails?.label}
                message={statusDetails?.message}
                isCancelled={isCancelled}
              />
            </div>

            {/* Order Details & Info Grid */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <OrderDetails order={order} currentStatus={currentStatus} />
              <OrderInformation order={order} />
            </div>
          </div>
        )}

        {/* SECTION 2: PAST ORDERS TABLE */}
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Past Orders</h2>
              <p className="mt-1 text-sm text-text-muted">
                View your previous orders and items
              </p>
            </div>

            <span className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {pastOrders.length} Orders
            </span>
          </div>

          {!storedUser ? (
            <div className="py-12 text-center">
              <p className="text-text-muted">
                Please log in to view your past order history.
              </p>
              <Link
                to="/login"
                className="mt-4 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
              >
                Login Now
              </Link>
            </div>
          ) : pastOrdersLoading ? (
            <p className="py-10 text-center text-text-muted">
              Loading your past orders...
            </p>
          ) : pastOrders.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-text-muted">No past orders found.</p>
              <Link
                to="/menu"
                className="mt-4 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
              >
                Explore Menu & Order
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-150 text-left">
                <thead>
                  <tr className="border-b border-border text-sm text-text-muted">
                    <th className="pb-4">Order ID / Token</th>
                    <th className="pb-4">Products</th>
                    <th className="pb-4">Total Qty</th>
                    <th className="pb-4">Total Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pastOrders.map((pastOrder) => {
                    const totalQty =
                      pastOrder.items?.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      ) || 0;

                    return (
                      <tr
                        key={pastOrder.id}
                        className="border-b border-border last:border-0 hover:bg-background/50 transition"
                      >
                        <td className="py-5 font-semibold">
                          #{pastOrder.orderToken || pastOrder.id}
                        </td>

                        <td className="py-5">
                          <div className="flex flex-col gap-1 text-sm">
                            {pastOrder.items?.map((item) => (
                              <span key={item.id} className="text-text-muted">
                                {item.name}{" "}
                                <span className="text-primary font-medium">
                                  x {item.quantity}
                                </span>
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-5 text-sm font-medium">{totalQty}</td>

                        <td className="py-5 font-semibold">
                          ₹{Number(pastOrder.totalAmount || 0).toFixed(2)}
                        </td>

                        <td className="py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              statusStyles[pastOrder.status] ||
                              "bg-border text-text-muted"
                            }`}
                          >
                            {pastOrder.status || "PENDING"}
                          </span>
                        </td>

                        <td className="py-5 text-right">
                          <button
                            onClick={() => setOrder(pastOrder)}
                            className="rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-hover"
                          >
                            View Track
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <h3 className="text-xl font-bold">
            Thank You for Choosing Flora Cafe!
          </h3>
          <p className="mt-2 text-sm text-gray-500">Coffee. Comfort. Calm.</p>
        </div>
      </div>
    </div>
  );
};

export default Order;

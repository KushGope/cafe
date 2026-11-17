import { useEffect, useState } from "react";
import {
  FaStore,
  FaLock,
  FaLockOpen,
  FaCheckCircle,
  FaExclamationCircle,
  FaSyncAlt,
} from "react-icons/fa";
import { fetchClient } from "../../api/fetchClient";

function ShopStatus() {
  const [isOpen, setIsOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH SHOP STATUS

  const fetchShopStatus = async () => {
    try {
      setError("");

      const data = await fetchClient("/shop/status");

      if (typeof data.open !== "boolean") {
        throw new Error("Invalid shop status response");
      }

      setIsOpen(data.open);
    } catch (err) {
      console.error("Shop Status Error:", err);
      setError("Unable to connect to server. Please check your backend.");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadShopStatus = async () => {
      try {
        const data = await fetchClient("/shop/status");

        if (typeof data.open !== "boolean") {
          throw new Error("Invalid shop status response");
        }

        if (!ignore) {
          setIsOpen(data.open);
          setError("");
        }
      } catch (err) {
        console.error("Shop Status Error:", err);

        if (!ignore) {
          setError("Unable to connect to server. Please check your backend.");
        }
      } finally {
        if (!ignore) {
          setInitialLoading(false);
        }
      }
    };

    loadShopStatus();

    return () => {
      ignore = true;
    };
  }, []);

  // TOGGLE SHOP STATUS
  const toggleShop = async () => {
    if (isOpen === null || loading) return;

    const action = isOpen ? "close" : "open";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} Flora Cafe?`,
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");

      const data = await fetchClient("/admin/shop/status", {
        method: "PUT",
        body: {
          open: !isOpen,
        },
      });

      if (typeof data.open !== "boolean") {
        throw new Error("Invalid server response");
      }

      setIsOpen(data.open);
    } catch (err) {
      console.error("Update Shop Error:", err);
      setError("Unable to update shop status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // LOADING SCREEN
  if (initialLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <div className="text-center">
          <FaSyncAlt className="mx-auto mb-4 animate-spin text-3xl text-rose-500" />

          <p className="font-medium text-gray-500">Loading shop status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
          <FaStore className="text-xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Shop Management</h2>

          <p className="text-sm text-gray-500">
            Manage Flora Cafe availability
          </p>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <FaExclamationCircle className="mt-0.5 shrink-0" />

          <div>
            <p className="font-semibold">Something went wrong</p>
            <p>{error}</p>

            <button
              onClick={fetchShopStatus}
              className="mt-2 font-semibold underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        {/* STATUS HEADER */}
        <div className="border-b border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-wider text-gray-400">
                CURRENT SHOP STATUS
              </p>

              <h3 className="text-3xl font-bold text-gray-800">
                {isOpen === null
                  ? "Status Unavailable"
                  : isOpen
                    ? "We're Open!"
                    : "We're Closed"}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {isOpen === null
                  ? "Please check your server connection."
                  : isOpen
                    ? "Your cafe is currently accepting customers."
                    : "Your cafe is currently not accepting customers."}
              </p>
            </div>

            {/* STATUS BADGE */}
            {isOpen !== null && (
              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${
                  isOpen
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isOpen ? "animate-pulse bg-green-600" : "bg-red-600"
                  }`}
                />

                {isOpen ? "OPEN NOW" : "CLOSED"}
              </div>
            )}
          </div>
        </div>

        {/* STATUS DETAILS */}
        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
          {/* OPEN CARD */}
          <div
            className={`rounded-2xl border p-5 transition ${
              isOpen === true
                ? "border-green-200 bg-green-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <FaLockOpen
              className={`mb-4 text-2xl ${
                isOpen === true ? "text-green-600" : "text-gray-400"
              }`}
            />

            <h4 className="font-bold text-gray-800">Shop Open</h4>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Customers can access your website and place new orders.
            </p>
          </div>

          {/* CLOSED CARD */}
          <div
            className={`rounded-2xl border p-5 transition ${
              isOpen === false
                ? "border-red-200 bg-red-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <FaLock
              className={`mb-4 text-2xl ${
                isOpen === false ? "text-red-600" : "text-gray-400"
              }`}
            />

            <h4 className="font-bold text-gray-800">Shop Closed</h4>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your animated closing page will replace the normal homepage.
            </p>
          </div>
        </div>

        {/* ACTION SECTION */}
        <div className="border-t border-gray-100 bg-gray-50 p-6 sm:p-8">
          <h4 className="mb-2 font-bold text-gray-800">
            Control Shop Availability
          </h4>

          <p className="mb-6 text-sm leading-6 text-gray-500">
            Change your shop availability anytime. The status will be saved in
            your database.
          </p>

          <button
            onClick={toggleShop}
            disabled={loading || isOpen === null}
            className={`flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${
              isOpen
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? (
              <>
                <FaSyncAlt className="animate-spin" />
                Updating Status...
              </>
            ) : isOpen ? (
              <>
                <FaLock />
                Close Shop
              </>
            ) : (
              <>
                <FaLockOpen />
                Open Shop
              </>
            )}
          </button>

          {/* SUCCESS MESSAGE */}
          {!error && isOpen !== null && (
            <p className="mt-5 flex items-center gap-2 text-xs text-gray-500">
              <FaCheckCircle className="text-green-500" />
              Shop status successfully synchronized with server.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopStatus;

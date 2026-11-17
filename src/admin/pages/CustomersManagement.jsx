import { useEffect, useState } from "react";
import { getAllCustomers } from "../services/adminService";

const capitalizeName = (name) => {
  if (!name) return "N/A";
  return name.trim().toUpperCase();
};

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch customers:", err);
        setError("Failed to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <p className="p-6">Loading customers...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Customers</h2>
          <p className="mt-1 text-sm text-text-muted">
            Manage all Flora Cafe customers
          </p>
        </div>

        <span className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold">
          {customers.length} Customers
        </span>
      </div>

      {/* Empty State */}
      {customers.length === 0 ? (
        <p className="py-10 text-center text-text-muted">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead>
              <tr className="border-b border-border text-sm text-text-muted">
                <th className="pb-4">Customer ID</th>
                <th className="pb-4">Name</th>
                <th className="pb-4">Username / Phone</th>
                <th className="pb-4">Total Orders</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Joined Date</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-5 font-semibold">#{customer.id}</td>

                  <td className="py-5 font-medium">
                    {capitalizeName(customer.name || "N/A")}
                  </td>

                  <td className="py-5">
                    {capitalizeName(customer.username || "N/A")}
                  </td>

                  <td className="py-5">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      {customer.totalOrders ?? 0}
                    </span>
                  </td>

                  <td className="py-5">
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                      {customer.role}
                    </span>
                  </td>

                  <td className="py-5 text-sm text-text-muted">
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "N/A"}
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

export default CustomersManagement;

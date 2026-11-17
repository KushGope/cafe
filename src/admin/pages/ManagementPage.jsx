import CustomersManagement from "./CustomersManagement";
import OrdersManagement from "./OrdersManagement";

const ManagementPage = ({ activeTab, changeTab }) => {
  switch (activeTab) {
    case "Orders":
      return <OrdersManagement />;

    // case "Products":
    //   return <ProductsManagement />;

    // case "Categories":
    //   return <CategoriesManagement />;

    case "Customers":
      return <CustomersManagement />;

    // case "Analytics":
    //   return <AnalyticsManagement />;

    // case "Settings":
    //   return <SettingsManagement />;

    default:
      return (
        <div className="rounded-2xl bg-surface p-6 shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold">{activeTab} Management</h2>

          <p className="mt-3 text-text-muted">This section is coming soon.</p>
        </div>
      );
  }
  // return (
  //   <div className="rounded-2xl bg-surface p-6 shadow-sm sm:p-10">
  //     <h2 className="text-2xl font-bold">{activeTab} Management</h2>

  //     <p className="mt-3 text-text-muted">
  //       Manage your Flora Cafe {activeTab.toLowerCase()} here.
  //     </p>

  //     {activeTab === "Products" && (
  //       <button
  //         onClick={() => {
  //           // TODO: Add product functionality here
  //         }}
  //         className="mt-6 rounded-xl bg-foreground px-6 py-3 font-semibold text-white hover:bg-primary-hover"
  //       >
  //         + Add New Product
  //       </button>
  //     )}
  //   </div>
  // );
};

export default ManagementPage;

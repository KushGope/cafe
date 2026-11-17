import { useState } from "react";

import Sidebar from "./layout/Sidebar.jsx";
import AdminHeader from "./layout/AdminHeader.jsx";
import ManagementPage from "./pages/ManagementPage";
import Dashboard from "./pages/Dashboard.jsx";
import ShopStatus from "./pages/ShopManagement.jsx";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        changeTab={changeTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="min-h-screen md:ml-72">
        {/* Header */}
        <AdminHeader activeTab={activeTab} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <section className="p-4 sm:p-6 lg:p-10">
          {activeTab === "Dashboard" ? (
            <Dashboard changeTab={changeTab} />
          ) : activeTab === "Shop Management" ? (
            <ShopStatus />
          ) : (
            <ManagementPage activeTab={activeTab} changeTab={changeTab} />
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;

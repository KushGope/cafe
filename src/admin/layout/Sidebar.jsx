import { useNavigate } from "react-router-dom";
import { menuItems } from "../data/adminData";

const Sidebar = ({ activeTab, changeTab, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout from Flora Cafe Admin?",
    );

    if (!confirmed) return;

    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("floraUserLoggedIn");

    // Notify authentication changes
    window.dispatchEvent(new Event("flora-auth-change"));

    // Close sidebar
    setSidebarOpen(false);

    // Redirect to admin login
    navigate("/adminlogin", { replace: true });
  };

  const handleNavigation = (item) => {
    if (item.type === "logout") {
      handleLogout();
      return;
    }

    changeTab(item.name);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
        bg-foreground p-6 text-white shadow-xl
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Logo + Close Button */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">Flora Cafe</h1>

            <p className="mt-1 text-sm text-white/50">Admin Dashboard</p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg
            bg-white/10 text-xl text-white transition
            hover:bg-white/20 md:hidden"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2">
          {menuItems.map((item) => {
            const isLogout = item.type === "logout";

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3
                text-left transition-all
                ${
                  isLogout
                    ? "border-t border-white/10 text-red-300 hover:bg-red-500 hover:text-white"
                    : activeTab === item.name
                      ? "bg-background text-foreground shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

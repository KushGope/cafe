const AdminHeader = ({ activeTab, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg bg-foreground px-3 py-2 text-xl text-white md:hidden"
        >
          ☰
        </button>

        <div>
          <h2 className="text-xl font-bold sm:text-2xl">{activeTab}</h2>

          <p className="hidden text-sm text-text-muted sm:block">
            Welcome back, Admin!
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <button className="rounded-xl bg-surface p-3 shadow-sm">🔔</button>

        <div className="flex items-center gap-2 rounded-xl bg-surface p-2 shadow-sm sm:pr-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-border font-bold">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Administrator</p>

            <p className="text-xs text-text-muted">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
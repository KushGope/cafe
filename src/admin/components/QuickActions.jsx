const QuickActions = ({ changeTab }) => {
  return (
    <div className="rounded-2xl bg-foreground p-6 text-white">
      <h3 className="text-xl font-bold">Quick Actions</h3>

      <p className="mb-7 mt-2 text-sm text-white/50">
        Manage your cafe quickly.
      </p>

      <div className="space-y-4">
        <button
          onClick={() => changeTab("Products")}
          className="w-full rounded-xl bg-surface p-4 font-semibold text-foreground transition hover:bg-background"
        >
          + Add New Product
        </button>

        <button
          onClick={() => changeTab("Orders")}
          className="w-full rounded-xl bg-white/10 p-4 font-semibold transition hover:bg-white/20"
        >
          View Orders
        </button>

        <button
          onClick={() => changeTab("Categories")}
          className="w-full rounded-xl bg-white/10 p-4 font-semibold transition hover:bg-white/20"
        >
          Manage Categories
        </button>
      </div>
    </div>
  );
};

export default QuickActions;

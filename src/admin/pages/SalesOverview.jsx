import { weeklySales } from "../data/adminData";

const SalesOverview = () => {
  return (
    <div className="rounded-2xl bg-surface p-5 shadow-sm sm:p-6 xl:col-span-2">
      <h3 className="text-xl font-bold">Sales Overview</h3>

      <p className="mt-1 text-sm text-text-muted">Weekly sales performance</p>

      <div className="mt-8 flex h-52 items-end justify-between gap-3">
        {weeklySales.map((item) => (
          <div
            key={item.day}
            className="flex h-full flex-1 flex-col items-center justify-end gap-3"
          >
            <div
              style={{ height: `${item.value}%` }}
              className="w-full max-w-12 rounded-t-lg bg-primary transition hover:bg-primary-hover"
            />

            <span className="text-xs text-text-muted">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesOverview;

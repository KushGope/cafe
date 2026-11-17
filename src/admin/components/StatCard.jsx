const StatCard = ({ stat }) => {
  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">
          {stat.title}
        </p>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background text-xl text-primary">
          {stat.icon}
        </div>
      </div>

      <h3 className="mt-5 text-2xl font-bold text-foreground">
        {stat.value}
      </h3>

      <p className="mt-2 text-sm font-medium text-success">
        ↑ {stat.change} this month
      </p>
    </div>
  );
};

export default StatCard;
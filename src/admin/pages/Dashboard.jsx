import { stats } from "../data/adminData";

import StatCard from "../components/StatCard";
import SalesOverview from "./SalesOverview";
import QuickActions from "../components/QuickActions";
import RecentOrders from "../components/RecentOrders";

const Dashboard = ({ changeTab }) => {
  return (
    <>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome to Flora Cafe ☕
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here's what's happening with your cafe today.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Sales and Quick Actions */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SalesOverview />

        <QuickActions changeTab={changeTab} />
      </div>

      {/* Recent Orders */}
      <RecentOrders changeTab={changeTab} />
    </>
  );
};

export default Dashboard;

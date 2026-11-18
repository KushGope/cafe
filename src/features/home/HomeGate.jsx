import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import ShopClosed from "./ShopClosed";
import MainLayout from "./MainLayout";
import { fetchClient } from "../../api/fetchClient";

function HomeGate() {
  const [shopOpen, setShopOpen] = useState(null);
  const [error, setError] = useState(false);

  const checkShopStatus = async () => {
    try {
      setError(false);

      const data = await fetchClient("/shop/status");

      if (typeof data.open !== "boolean") {
        throw new Error("Invalid shop status response");
      }

      setShopOpen(data.open);
    } catch (err) {
      console.error("Shop status error:", err);
      setError(true);
    }
  };

  useEffect(() => {
    checkShopStatus();
  }, []);

  // LOADING
  if (shopOpen === null && !error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
        <p className="animate-pulse text-[#b76e79]">Loading Flora Cafe...</p>
      </div>
    );
  }

  // API ERROR
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>Unable to load Flora Cafe.</p>

        <button
          onClick={checkShopStatus}
          className="rounded-lg bg-rose-500 px-5 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  // SHOP CLOSED
  if (shopOpen === false) {
    return <ShopClosed />;
  }

  // SHOP OPEN
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default HomeGate;

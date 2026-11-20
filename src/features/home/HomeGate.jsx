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

      const data = await fetchClient("/shop/status", {
        auth: false,
      });

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blush border-t-primary-light" />

          <p className="animate-pulse font-medium tracking-wide text-primary-light">
            Loading Flora Cafe...
          </p>

          <p className="text-xs tracking-[2px] text-text-muted">
            COFFEE. COMFORT. CALM.
          </p>
        </div>
      </div>
    );
  }

  // API ERROR
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6">
        <div className="rounded-3xl border border-border-muted bg-surface p-8 text-center shadow-card sm:p-10">
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-3xl text-primary-light">
              !
            </div>
          </div>

          <h2 className="font-['Homemade_Apple'] text-2xl text-primary sm:text-3xl">
            Oops! Something went wrong
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-text-muted">
            We couldn't connect to Flora Cafe right now. Please try again in a
            moment.
          </p>

          <button
            onClick={checkShopStatus}
            className="mt-7 rounded-button bg-primary px-7 py-3 font-medium text-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg active:scale-95"
          >
            Retry Connection
          </button>

          <p className="mt-6 text-[10px] tracking-[3px] text-botanical">
            FLORA CAFE
          </p>
        </div>
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

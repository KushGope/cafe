import { useEffect, useState } from "react";
import ShopClosed from "./ShopClosed";
import { fetchClient } from "../../api/fetchClient";
import MainLayout from "./MainLayout";
import { Outlet } from "react-router-dom";

function HomeGate() {
  const [shopOpen, setShopOpen] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const checkShopStatus = async () => {
      try {
        const data = await fetchClient("/shop/status");
        console.log(data);
        if (typeof data.open !== "boolean") {
          throw new Error("Invalid shop status response");
        }

        if (!ignore) {
          setShopOpen(data.open);
          setError(false);
        }
      } catch (error) {
        console.error("Shop status error:", error);
        setShopOpen("error");
        if (!ignore) {
          setError(true);
        }
      }
    };

    checkShopStatus();
    return () => {
      ignore = true;
    };
  }, []);

  if (shopOpen === null && !error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
        <p className="animate-pulse text-[#b76e79]">Loading Flora Cafe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>Unable to load Flora Cafe.</p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-rose-500 px-5 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }
  // SHOP CLOSED
  if (!shopOpen) {
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

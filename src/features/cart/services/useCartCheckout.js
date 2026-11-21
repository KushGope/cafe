import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../orders/orderService";
import { generateWhatsAppOrderUrl } from "../services/whatsappService";
import { fetchClient } from "../../../api/fetchClient";

export function useCartCheckout({ cart, totalItems, totalPrice, clearCart }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Construct the common order payload
  function createOrderPayload() {
    return {
      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };
  }

  // Direct WhatsApp ordering (without backend persistence)
  function orderViaWhatsApp() {
    if (!cart.length) return;

    const whatsappUrl = generateWhatsAppOrderUrl({
      cart,
      totalItems,
      totalPrice,
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  // Guest ordering with backend persistence
  async function handleGuestOrder() {
    if (checkoutLoading || !cart.length) return;

    const confirmed = window.confirm(
      "Continue as Guest?", // Your order will be saved and sent to Flora Cafe through WhatsApp.",
    );

    if (!confirmed) {
      navigate("/login", {
        state: { from: "/cart" },
      });
      return;
    }

    // Open synchronously to avoid popup blockers
    const whatsappWindow = window.open("about:blank", "_blank");

    if (!whatsappWindow) {
      alert("Please allow popups to continue.");
      return;
    }

    try {
      setCheckoutLoading(true);

      // 1. Initialize a fresh guest session
      const guestResponse = await fetchClient("/auth/guest/login", {
        method: "POST",
      });

      if (!guestResponse?.token) {
        throw new Error("Failed to initialize guest session.");
      }

      // 2. Save guest authentication data
      localStorage.setItem("token", guestResponse.token);

      if (guestResponse.user) {
        localStorage.setItem("user", JSON.stringify(guestResponse.user));
      } else {
        localStorage.removeItem("user");
      }

      localStorage.setItem("floraUserLoggedIn", "true");

      window.dispatchEvent(new Event("flora-auth-change"));

      // 3. Create backend order
      const payload = createOrderPayload();
      const order = await placeOrder(payload);

      if (!order?.orderToken) {
        throw new Error("Invalid order response from server.");
      }
      // 4. Save guest order token for tracking
      localStorage.setItem("guestOrderToken", order.orderToken.toString());

      // 5. Generate WhatsApp message using backend order
      const whatsappUrl = generateWhatsAppOrderUrl(order);
      // 6. Redirect to WhatsApp
      whatsappWindow.location.href = whatsappUrl;

      clearCart();
      navigate("/order", {
        state: { guestOrder: order },
      });
    } catch (error) {
      console.error("Guest checkout failed:", error);

      whatsappWindow.close();

      alert(error.message || "Unable to create guest order. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  // Registered customer checkout
  async function handleCheckout() {
    if (checkoutLoading || !cart.length) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      alert("Please login or use WhatsApp to place your order.");
      return;
    }

    try {
      setCheckoutLoading(true);

      const payload = createOrderPayload();
      const response = await placeOrder(payload);

      clearCart();

      navigate("/order", {
        state: { order: response },
      });
    } catch (error) {
      console.error("Checkout failed:", error);

      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("floraUserLoggedIn");

        window.dispatchEvent(new Event("flora-auth-change"));

        setIsAuthenticated(false);

        alert(
          "Your session has expired. Please place your order through WhatsApp.",
        );

        return;
      }

      alert(error.message || "Failed to place order. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return {
    isAuthenticated,
    checkoutLoading,
    handleCheckout,
    handleGuestOrder,
    orderViaWhatsApp,
  };
}

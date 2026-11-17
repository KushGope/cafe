import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useState } from "react";
import { placeOrder } from "../orders/orderService";
import { fetchClient } from "../../api/fetchClient";

function Cart() {
  const { cart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleCheckout() {
    if (checkoutLoading) return;

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setCheckoutLoading(true);

      // 1. Check if token already exists
      let token = localStorage.getItem("token");

      // 2. If not logged in, offer a choice: Login vs. Continue as Guest
      if (!token) {
        const wantToLogin = window.confirm(
          "You are not logged in. Would you like to log in first? Click 'Cancel' to continue as a Guest.",
        );

        if (wantToLogin) {
          // Redirect them to login, saving where they came from
          navigate("/login", { state: { from: "/cart" } });
          return;
        }

        // Otherwise, call your guest login endpoint!
        const guestResponse = await fetchClient("/auth/guest/login", {
          method: "POST",
        });

        if (!guestResponse || !guestResponse.token) {
          throw new Error("Failed to initialize guest session.");
        }

        // Store the guest token and session data
        localStorage.setItem("token", guestResponse.token);
        if (guestResponse.user) {
          localStorage.setItem("user", JSON.stringify(guestResponse.user));
        }
        localStorage.setItem("floraUserLoggedIn", "true");
        window.dispatchEvent(new Event("flora-auth-change"));
      }

      // 3. Construct payload
      const payload = {
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };

      // 4. Place order using the token (regular or guest)
      const response = await placeOrder(payload);
      console.log("Order Response:", response);

      // 5. Clear cart and navigate to tracking page
      clearCart();
      navigate("/order", {
        state: { order: response },
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      if (error.message.includes("401") || error.message.includes("403")) {
        alert("Your session has expired. Please try again.");
        localStorage.removeItem("token");
      } else {
        alert(error.message || "Failed to place order. Please try again.");
      }
    } finally {
      setCheckoutLoading(false);
    }
  }

  // async function handleCheckout(cart) {
  //   // 1. Prevent duplicate checkout
  //   if (checkoutLoading) return;

  //   if (cart.length === 0) {
  //     alert("Your cart is empty.");
  //     return;
  //   }

  //   // 2. Check authentication token
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("Please login before placing your order.");
  //     navigate("/login", {
  //       state: { from: "/cart" },
  //     });
  //     return;
  //   }

  //   // 3. Retrieve stored user data
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (!storedUser || !storedUser.id) {
  //     alert("User session not found. Please log in again.");
  //     navigate("/login");
  //     return;
  //   }

  //   // 4. Construct payload including user association data
  //   const payload = {
  //     items: cart.map((item) => ({
  //       id: item.id,
  //       quantity: item.quantity,
  //     })),
  //   };

  //   try {
  //     setCheckoutLoading(true);
  //     // 5. Place order
  //     const response = await placeOrder(payload);
  //     console.log("Order Response:", response);
  //     // 6. Clear cart only after successful order
  //     clearCart();

  //     // 7. Navigate to order tracking
  //     navigate("/order", {
  //       state: { order: response },
  //     });
  //   } catch (error) {
  //     console.error("Checkout failed:", error);
  //     if (error.message.includes("401") || error.message.includes("403")) {
  //       alert("Your session may have expired. Please login again.");

  //       localStorage.removeItem("token");

  //       navigate("/login", {
  //         state: { from: "/cart" },
  //       });
  //     }
  //     alert(error.message || "Failed to place order. Please try again.");
  //   } finally {
  //     setCheckoutLoading(false);
  //   }
  // }

  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-primary">
            Your Selection
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Your Cart 🛒</h1>

          <p className="mt-4 text-foreground/70">
            Review your favourite treats before checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="rounded-card bg-surface p-8 text-center shadow-sm sm:p-12">
            <p className="text-5xl">☕</p>

            <h2 className="mt-5 text-2xl font-bold">Your cart is empty</h2>

            <p className="mt-3 text-foreground/70">
              Discover something delicious at Flora Cafe.
            </p>

            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-white transition hover:bg-primary-hover"
            >
              Start Ordering
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-36 w-full rounded-xl object-cover sm:h-28 sm:w-28"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{item.name}</h2>

                    <p className="mt-1 text-sm text-foreground/70">
                      ₹{item.price} per item
                    </p>

                    <p className="mt-2 font-semibold text-primary">
                      Subtotal: ₹{item.price * item.quantity}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Remove one ${item.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-xl text-primary transition hover:bg-primary hover:text-white"
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Add one ${item.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-xl text-primary transition hover:bg-primary hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 rounded-card border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-foreground/70">Total items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-lg font-semibold">Total amount</span>

                <span className="text-2xl font-bold text-primary">
                  ₹{totalPrice}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/order"
                  className="rounded-full border-2 border-primary px-6 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  Continue Shopping
                </Link>

                <button
                  type="button"
                  onClick={() => handleCheckout(cart)}
                  disabled={checkoutLoading}
                  className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {checkoutLoading ? "Placing Order..." : "Proceed to Checkout"}
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full border border-border px-6 py-3 font-semibold text-foreground/70 transition hover:bg-background"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Cart;

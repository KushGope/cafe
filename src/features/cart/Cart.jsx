import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useCartCheckout } from "./services/useCartCheckout";
import CartSummary from "./components/CartSummary";
import CartActions from "./components/CartActions";
import CartItem from "./components/CartItem";

function Cart() {
  const { cart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  const { isAuthenticated, checkoutLoading, handleCheckout, handleGuestOrder } =
    useCartCheckout({
      cart,
      totalItems,
      totalPrice,
      clearCart,
    });

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
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 rounded-card border border-border bg-surface p-6 sm:p-8">
              <CartSummary totalItems={totalItems} totalPrice={totalPrice} />

              {/* Cart Actions */}
              <CartActions
                isAuthenticated={isAuthenticated}
                checkoutLoading={checkoutLoading}
                handleCheckout={handleCheckout}
                handleGuestOrder={handleGuestOrder}
                clearCart={clearCart}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Cart;

import { Link } from "react-router-dom";

function CartActions({
  isAuthenticated,
  checkoutLoading,
  handleCheckout,
  handleGuestOrder,
  clearCart,
}) {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <Link
        to="/menu"
        className="rounded-full border-2 border-primary px-6 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-white"
      >
        Continue Shopping
      </Link>

      {isAuthenticated ? (
        <button
          type="button"
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {checkoutLoading ? "Placing Order..." : "Proceed to Checkout"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleGuestOrder}
          className="rounded-full bg-botanical px-6 py-3 font-semibold text-white transition hover:bg-green-700/70"
        >
          Order as Guest
        </button>
      )}

      <button
        type="button"
        onClick={clearCart}
        className="rounded-full border border-border px-6 py-3 font-semibold text-foreground/70 transition hover:bg-background"
      >
        Clear Cart
      </button>
    </div>
  );
}

export default CartActions;

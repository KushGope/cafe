import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <article className="flex h-85 flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative h-56 shrink-0 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-surface-muted/95 px-3 py-1 text-[11px] font-semibold text-primary">
          {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="flex flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-foreground line-clamp-1">
            {product.name}
          </h3>

          <span className="shrink-0 text-sm font-bold text-primary">
            ₹{product.price}
          </span>
        </div>

        <p className="mt-1 text-xs leading-4 text-text-muted line-clamp-2">
          {product.description}
        </p>

        {/* Action Area */}
        <div className="flex items-center gap-2 pt-2">
          {/* Quantity Controls */}
          {quantity > 0 && (
            <div className="flex h-9 flex-1 items-center overflow-hidden rounded-lg border border-border-muted">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                aria-label="Decrease quantity"
                className="flex flex-1 items-center justify-center bg-surface-soft text-lg font-bold text-primary hover:bg-primary-soft"
              >
                −
              </button>

              <span className="flex flex-1 items-center justify-center border-x border-border-muted text-sm font-bold text-foreground">
                {quantity}
              </span>

              <button
                onClick={() => updateQuantity(product.id, 1)}
                aria-label="Increase quantity"
                className="flex flex-1 items-center justify-center bg-surface-soft text-lg font-bold text-primary hover:bg-primary-soft"
              >
                +
              </button>
            </div>
          )}

          {/* Add to Cart Button / Cart Icon */}
          <button
            onClick={cartItem ? handleCartClick : () => addToCart(product)}
            aria-label={cartItem ? "View cart" : "Add to cart"}
            title={cartItem ? "View Cart" : "Add to Cart"}
            className={`flex h-9 items-center justify-center rounded-button bg-primary text-white transition duration-300 hover:bg-primary-hover active:scale-95 ${
              cartItem ? "w-10 shrink-0" : "flex-1 px-3 text-xs font-semibold"
            }`}
          >
            {cartItem ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

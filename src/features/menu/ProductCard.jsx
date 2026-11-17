import { useCart } from "../cart/CartContext";

function ProductCard({ product }) {
  const { cart, addToCart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <article className="overflow-hidden rounded-2xl border border-red-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 hover:scale-105 sm:h-64"
        />

        <span className="absolute left-4 top-4 rounded-full bg-[#f8f6f5]/95 px-4 py-1.5 text-xs font-semibold text-red-800">
          {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold">{product.name}</h3>

          <span className="shrink-0 text-lg font-bold text-red-800">
            ₹{product.price}
          </span>
        </div>

        <p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">
          {product.description}
        </p>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-5 w-full rounded-xl bg-red-800 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-red-900"
        >
          {cartItem
            ? `Add Another (${cartItem.quantity} in cart)`
            : "Add to Cart +"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

function CartItem({ item, updateQuantity }) {
  return (
    <article className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
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

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => updateQuantity(item.id, -1)}
          aria-label={`Remove one ${item.name}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-xl text-primary transition hover:bg-primary hover:text-white"
        >
          −
        </button>

        <span className="min-w-6 text-center font-bold">{item.quantity}</span>

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
  );
}

export default CartItem;

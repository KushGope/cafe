function CartSummary({ totalItems, totalPrice }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="text-foreground/70">Total items</span>
        <span className="font-semibold">{totalItems}</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-lg font-semibold">Total amount</span>

        <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
      </div>
    </>
  );
}

export default CartSummary;

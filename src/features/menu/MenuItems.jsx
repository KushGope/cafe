


import ProductCard from "./ProductCard";

function MenuItems({ products }) {
  if (products.length === 0) {
    return (
      <p className="col-span-full py-10 text-center text-gray-500">
        No products available in this category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default MenuItems;

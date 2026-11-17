import { useEffect, useState } from "react";
// Data
// import { categories } from "../../data/products";

// Components
import MenuItems from "./MenuItems";

// API
import { getAvailableMenuItems } from "./menuService";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAvailableMenuItems();
        // console.log("Backend menu response:", response);
        // Normalize backend response

        const menuData = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.products)
              ? response.products
              : Array.isArray(response?.content)
                ? response.content
                : [];

        setProducts(menuData);
      } catch (err) {
        console.error("Failed to load menu:", err);
        setError("Unable to load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Generate categories dynamically from database products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section
      id="order"
      className="bg-background px-4 py-16 text-foreground sm:px-6 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Made with love
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Order Your <span className="text-primary">Favorites</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-foreground/70 sm:text-base">
            From freshly brewed coffee to delicious treats, discover something
            special at Flora Cafe.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-12 text-center text-foreground/70">
            Loading delicious treats...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="py-12 text-center text-red-500">{error}</p>
        )}

        {/* Products */}
        {!loading && !error && (
          <>
            {/* Category Filters */}
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition duration-300 ${
                    selectedCategory === category
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface text-primary hover:bg-background"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Product Cards */}
            {filteredProducts.length > 0 ? (
              <MenuItems products={filteredProducts} />
            ) : (
              <p className="py-12 text-center text-foreground/70">
                No products available in this category.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Menu;

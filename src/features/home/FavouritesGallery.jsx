const recommendedDishes = [
  {
    name: "Special Cheese Pizza",
    category: "Chef's Recommendation",
    price: "₹249",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700",
  },
  {
    name: "Creamy Cappuccino",
    category: "Coffee Special",
    price: "₹129",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=700",
  },
  {
    name: "Chocolate Dessert",
    category: "Sweet Treat",
    price: "₹149",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
  },
  {
    name: "Fresh Bakery",
    category: "Freshly Baked",
    price: "₹99",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=700",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700",
];

const FavouritesGallery = () => {
  return (
    <section className="overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Made With Love
          </p>

          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
            Our Favourites
          </h2>

          <p className="mt-3 font-homemade-apple text-xl text-primary">
            & Beautiful Moments
          </p>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-text-muted sm:text-base">
            Discover our most loved flavours, freshly prepared dishes, and
            beautiful moments at Flora Cafe.
          </p>
        </div>

        {/* Recommended Dishes */}
        <div className="mb-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Handpicked For You
              </p>

              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                Recommended Dishes
              </h3>
            </div>

            <a
              href="#menu"
              className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Explore Menu
            </a>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedDishes.map((dish, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-surface px-4 py-2 text-xs font-semibold text-primary shadow-sm">
                    Popular
                  </span>
                </div>

                <div className="p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {dish.category}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg font-bold text-foreground">
                      {dish.name}
                    </h4>

                    <span className="font-bold text-primary">{dish.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              A Glimpse Of Flora
            </p>

            <h3 className="text-3xl font-bold text-foreground sm:text-4xl">
              Our Gallery
            </h3>

            <p className="mt-4 text-sm leading-7 text-text-muted sm:text-base">
              Good food, great coffee, and moments worth remembering.
            </p>
          </div>

          <div className="grid auto-rows-45 grid-cols-2 gap-4 md:auto-rows-57.5 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group overflow-hidden rounded-2xl border border-border ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`Flora Cafe gallery ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavouritesGallery;

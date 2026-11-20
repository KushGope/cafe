import coverimg from "../../assets/images/cover.jpeg";
import FavouritesGallery from "./FavouritesGallery";

function Hero() {
  return (
    <div>
      <section
        id="home"
        className="group relative flex min-h-[85vh] items-center overflow-hidden bg-background bg-cover bg-center bg-no-repeat sm:min-h-[90vh] lg:min-h-screen"
      >
        {/* HERO BACKGROUND */}
        <img
          src={coverimg}
          alt="Hero Background"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-12000 group-hover:scale-105"
        />

        {/* DARK COFFEE OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-r from-foreground/80 via-foreground/55 to-foreground/20" />

        {/* SOFT GLOW EFFECTS */}
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blush-light/30 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-[#d6b18c]/25 blur-[110px]" />
        <div className="pointer-events-none absolute right-1/3 top-1/4 h-48 w-48 rounded-full bg-primary-light/20 blur-[90px]" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-24 lg:px-12">
          <div className="max-w-3xl text-white">
            {/* WELCOME TEXT */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 shadow-[0_0_25px_rgba(232,184,193,0.20)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-blush-light shadow-[0_0_12px_4px_rgba(232,184,193,0.65)]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blush sm:text-sm">
                Welcome to Flora Cafe
              </p>
            </div>

            {/* MAIN HEADING */}
            <h1 className="text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Your
              <br />
              Happy
              <br />
              <span
                className="relative inline-block text-blush-light"
                style={{
                  textShadow:
                    "0 0 10px rgba(241,185,196,0.55), 0 0 25px rgba(183,110,121,0.55), 0 0 45px rgba(183,110,121,0.35)",
                }}
              >
                place.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-7 max-w-xl text-base leading-8 text-white/90 sm:text-lg sm:leading-9">
              Discover the perfect blend of rich coffee, delicious bites, and
              cozy vibes. At Flora Cafe, every visit is a little escape from the
              ordinary.
            </p>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              {/* EXPLORE MENU */}
              <a
                href="#menu"
                className="group/btn inline-flex items-center justify-center gap-3 rounded-full border border-blush-light/60 bg-primary-light px-8 py-4 text-center font-semibold text-white shadow-[0_0_20px_rgba(183,110,121,0.40)] transition duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-[0_0_35px_rgba(183,110,121,0.65)]"
              >
                Explore Our Menu
              </a>

              {/* ORDER NOW */}
              <a
                href="#order"
                className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-8 py-4 text-center font-semibold text-white shadow-[0_0_20px_rgba(255,255,255,0.10)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-coffee hover:shadow-[0_0_25px_rgba(255,255,255,0.30)]"
              >
                Order Now
              </a>
            </div>

            {/* SMALL INFORMATION SECTION */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/90">
              <span className="flex items-center gap-2 transition hover:text-blush-light">
                <span className="text-lg drop-shadow-[0_0_8px_rgba(241,185,196,0.8)]">
                  ☕
                </span>
                Freshly Brewed Coffee
              </span>

              <span className="flex items-center gap-2 transition hover:text-blush-light">
                <span className="text-lg drop-shadow-[0_0_8px_rgba(241,185,196,0.8)]">
                  🥐
                </span>
                Delicious Food
              </span>

              <span className="flex items-center gap-2 transition hover:text-blush-light">
                <span className="text-lg drop-shadow-[0_0_8px_rgba(241,185,196,0.8)]">
                  🌿
                </span>
                Cozy Atmosphere
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM GLOW LINE */}
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-blush-light to-transparent shadow-[0_0_15px_rgba(232,184,193,0.8)]" />
      </section>

      {/* FAVOURITES GALLERY */}
      <section>
        <FavouritesGallery />
      </section>
    </div>
  );
}

export default Hero;

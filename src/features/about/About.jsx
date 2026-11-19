import {
  FaLeaf,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCoffee,
  FaHeart,
} from "react-icons/fa";

import aboutimg from "../../assets/images/aboutimg.jpeg";

const About = () => {
  return (
    <section
      id="about"
      className="overflow-hidden bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* SECTION HEADING */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-5 py-2 text-sm font-medium tracking-wide text-primary-light">
            <FaLeaf />
            Discover Our Story
          </div>

          <h2 className="text-3xl font-bold text-coffee sm:text-4xl md:text-5xl">
            About <span className="text-primary-light">Flora Cafe</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
            More than just coffee, it's a place to relax, connect, and create
            beautiful memories.
          </p>
        </div>

        {/* MAIN ABOUT CONTENT */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* LEFT IMAGE */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-blush-light/40 blur-2xl" />

            <div className="absolute -bottom-5 -right-5 h-40 w-40 rounded-full bg-botanical-light/60 blur-2xl" />

            <div className="relative overflow-hidden rounded-[30px] border-8 border-surface shadow-xl">
              <img
                src={aboutimg}
                alt="Flora Cafe interior"
                className="h-87.5 w-full object-cover transition duration-700 hover:scale-105 md:h-120"
              />
            </div>

            {/* IMAGE BADGE */}
            <div className="absolute -bottom-6 left-5 rounded-2xl bg-surface px-6 py-4 shadow-lg sm:left-8">
              <p className="text-xl font-bold tracking-wide text-primary-light">
                Flora
              </p>

              <p className="text-xs font-medium tracking-widest text-text-muted">
                COFFEE. COMFORT. CALM.
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="pt-6 md:pt-0">
            <div className="mb-5 flex items-center gap-2 text-botanical">
              <FaLeaf />
              <span className="text-sm font-semibold uppercase tracking-[3px]">
                Welcome to Flora Cafe
              </span>
            </div>

            <h3 className="text-3xl font-bold leading-tight text-coffee sm:text-4xl">
              A Little Place For
              <span className="block text-primary-light">Big Happiness.</span>
            </h3>

            <p className="mt-6 leading-8 text-text-muted">
              At Flora Cafe, we believe that coffee is more than just a drink.
              It's a reason to slow down, enjoy the moment, and connect with the
              people around us.
            </p>

            <p className="mt-4 leading-8 text-text-muted">
              From freshly prepared coffee to delicious meals, every little
              detail is designed to make your experience special. Whether you're
              meeting friends, spending time with family, or simply taking a
              peaceful coffee break, Flora Cafe is your happy place.
            </p>

            {/* FEATURES */}
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {/* FRESH COFFEE */}
              <div className="rounded-card border border-border-soft bg-surface p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-xl text-primary-light">
                  <FaCoffee />
                </div>

                <h4 className="text-lg font-bold text-coffee">Fresh Coffee</h4>

                <p className="mt-2 text-sm leading-6 text-text-muted">
                  Freshly prepared coffee to brighten your day and refresh your
                  mood.
                </p>
              </div>

              {/* MADE WITH LOVE */}
              <div className="rounded-card border border-border-botanical bg-surface p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-botanical-soft text-xl text-botanical">
                  <FaHeart />
                </div>

                <h4 className="text-lg font-bold text-coffee">
                  Made With Love
                </h4>

                <p className="mt-2 text-sm leading-6 text-text-muted">
                  Every cup and every dish is prepared with care to make you
                  feel special.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESS SECTION */}
        <div className="relative mt-28 overflow-hidden rounded-[30px] bg-surface-soft shadow-xl">
          <div className="grid items-stretch md:grid-cols-2">
            {/* GOOGLE MAP */}
            <div className="relative min-h-87.5 md:min-h-[450px]">
              <iframe
                title="Flora Cafe Location"
                src="https://www.google.com/maps?q=Balarampur%20Rangadih%20723143%20Purulia%20West%20Bengal%20India&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* ADDRESS DETAILS */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-surface-soft px-7 py-14 sm:px-12 md:px-14">
              {/* DECORATIVE CIRCLES */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blush-light/30 blur-2xl" />

              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-botanical-light/40 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center gap-2 text-botanical">
                  <FaLeaf />
                  <span className="text-sm font-semibold uppercase tracking-[3px]">
                    Come Visit Us
                  </span>
                </div>

                <h3 className="text-3xl font-bold leading-tight text-coffee sm:text-4xl">
                  Find Your
                  <span className="block text-primary-light">Happy Place.</span>
                </h3>

                <p className="mt-6 max-w-md leading-8 text-text-muted">
                  We would love to welcome you to Flora Cafe. Visit us with your
                  friends and family, enjoy delicious food, freshly prepared
                  coffee, and make beautiful memories with us.
                </p>

                {/* ADDRESS */}
                <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border-muted bg-surface/80 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xl text-primary-light">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h4 className="font-bold text-coffee">Our Location</h4>

                    <p className="mt-2 text-sm leading-7 text-text-muted">
                      Balarampur Near-ForestRoad,
                      <br />
                      Rangadih - 723143,
                      <br />
                      District - Purulia,
                      <br />
                      West Bengal, India.
                    </p>
                  </div>
                </div>

                {/* GET DIRECTIONS */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Balarampur+Rangadih+723143+Purulia+West+Bengal+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-surface shadow-md transition duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-lg"
                >
                  Get Directions
                  <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

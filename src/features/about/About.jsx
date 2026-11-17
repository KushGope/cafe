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
    <section id="about" className="overflow-hidden bg-[#fffaf5] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* SECTION HEADING */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f8e8eb] px-5 py-2 text-sm font-medium tracking-wide text-[#b76e79]">
            <FaLeaf />
            Discover Our Story
          </div>

          <h2 className="text-3xl font-bold text-[#55443d] sm:text-4xl md:text-5xl">
            About <span className="text-[#b76e79]">Flora Cafe</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#89776e] md:text-lg">
            More than just coffee, it's a place to relax, connect, and create
            beautiful memories.
          </p>
        </div>

        {/* MAIN ABOUT CONTENT */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* LEFT IMAGE */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-[#e8b8c1]/40 blur-2xl" />

            <div className="absolute -bottom-5 -right-5 h-40 w-40 rounded-full bg-[#c8d7bd]/60 blur-2xl" />

            <div className="relative overflow-hidden rounded-[30px] border-8 border-white shadow-xl">
              <img
                src={aboutimg}
                alt="Flora Cafe interior"
                className="h-87.5 w-full object-cover transition duration-700 hover:scale-105 md:h-120"
              />
            </div>

            {/* IMAGE BADGE */}
            <div className="absolute -bottom-6 left-5 rounded-2xl bg-white px-6 py-4 shadow-lg sm:left-8">
              <p className="text-xl font-bold tracking-wide text-[#b76e79]">
                Flora
              </p>
              <p className="text-xs font-medium tracking-widest text-[#89776e]">
                COFFEE. COMFORT. CALM.
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="pt-6 md:pt-0">
            <div className="mb-5 flex items-center gap-2 text-[#79956d]">
              <FaLeaf />
              <span className="text-sm font-semibold uppercase tracking-[3px]">
                Welcome to Flora Cafe
              </span>
            </div>

            <h3 className="text-3xl font-bold leading-tight text-[#55443d] sm:text-4xl">
              A Little Place For
              <span className="block text-[#b76e79]">Big Happiness.</span>
            </h3>

            <p className="mt-6 leading-8 text-[#89776e]">
              At Flora Cafe, we believe that coffee is more than just a drink.
              It's a reason to slow down, enjoy the moment, and connect with the
              people around us.
            </p>

            <p className="mt-4 leading-8 text-[#89776e]">
              From freshly prepared coffee to delicious meals, every little
              detail is designed to make your experience special. Whether you're
              meeting friends, spending time with family, or simply taking a
              peaceful coffee break, Flora Cafe is your happy place.
            </p>

            {/* FEATURES */}
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {/* FRESH COFFEE */}
              <div className="rounded-2xl border border-[#f0dfe0] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e8eb] text-xl text-[#b76e79]">
                  <FaCoffee />
                </div>

                <h4 className="text-lg font-bold text-[#55443d]">
                  Fresh Coffee
                </h4>

                <p className="mt-2 text-sm leading-6 text-[#89776e]">
                  Freshly prepared coffee to brighten your day and refresh your
                  mood.
                </p>
              </div>

              {/* MADE WITH LOVE */}
              <div className="rounded-2xl border border-[#e1eadc] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf0e5] text-xl text-[#79956d]">
                  <FaHeart />
                </div>

                <h4 className="text-lg font-bold text-[#55443d]">
                  Made With Love
                </h4>

                <p className="mt-2 text-sm leading-6 text-[#89776e]">
                  Every cup and every dish is prepared with care to make you
                  feel special.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESS SECTION - TWO DIVISIONS */}
        <div className="relative mt-28 overflow-hidden rounded-[30px] bg-[#f8eee9] shadow-xl">
          <div className="grid items-stretch md:grid-cols-2">
            {/* LEFT DIVISION - GOOGLE MAP */}
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

            {/* RIGHT DIVISION - ADDRESS DETAILS */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-[#f8eee9] px-7 py-14 sm:px-12 md:px-14">
              {/* DECORATIVE CIRCLES */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#e8b8c1]/30 blur-2xl" />

              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#c8d7bd]/40 blur-2xl" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center gap-2 text-[#79956d]">
                  <FaLeaf />
                  <span className="text-sm font-semibold uppercase tracking-[3px]">
                    Come Visit Us
                  </span>
                </div>

                <h3 className="text-3xl font-bold leading-tight text-[#55443d] sm:text-4xl">
                  Find Your
                  <span className="block text-[#b76e79]">Happy Place.</span>
                </h3>

                <p className="mt-6 max-w-md leading-8 text-[#89776e]">
                  We would love to welcome you to Flora Cafe. Visit us with your
                  friends and family, enjoy delicious food, freshly prepared
                  coffee, and make beautiful memories with us.
                </p>

                {/* ADDRESS */}
                <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#ead8d4] bg-white/80 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8e8eb] text-xl text-[#b76e79]">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h4 className="font-bold text-[#55443d]">Our Location</h4>

                    <p className="mt-2 text-sm leading-7 text-[#89776e]">
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

                {/* GET DIRECTIONS BUTTON */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Balarampur+Rangadih+723143+Purulia+West+Bengal+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#b76e79] px-7 py-4 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#a45b67] hover:shadow-lg"
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

import { Link } from "react-router-dom";

import { FaMapSigns, FaInstagram, FaFacebookF, FaLeaf } from "react-icons/fa";

import { MdPhoneInTalk, MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-footer text-coffee">
      {/* DECORATIVE BACKGROUND */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blush-soft/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-botanical-light/70 blur-3xl" />

      {/* MAIN FOOTER */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:gap-10 lg:px-12">
        {/* BRAND SECTION */}
        <div>
          <h2
            className="text-4xl font-bold tracking-wide text-primary-light"
            style={{ fontFamily: "var(--font-flowmery)" }}
          >
            Flora Cafe
          </h2>

          <div className="mt-3 flex items-center gap-2 text-botanical">
            <FaLeaf />
            <span className="h-px w-12 bg-botanical-light" />
            <FaLeaf />
          </div>

          <p className="mt-5 max-w-xs text-sm leading-7 text-text-muted">
            Sometimes, You just need a cup of coffee and a moment to yourself.
            At Flora Cafe, we provide the perfect environment for you to relax,
            recharge, and enjoy the simple pleasures of life.
          </p>

          <p className="mt-5 text-sm font-semibold italic text-primary-light">
            Coffee. Comfort. Calm.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/flora___cafe?utm_source=ig_web_button_share_sheet&rpxt=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary-light transition duration-300 hover:-translate-y-1 hover:bg-primary-light hover:text-surface"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-botanical-soft text-botanical transition duration-300 hover:-translate-y-1 hover:bg-botanical hover:text-surface"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold text-primary-light">Quick Links</h3>

          <div className="mt-2 h-1 w-10 rounded-full bg-blush-light" />

          <ul className="mt-6 space-y-4 text-sm text-text-muted">
            <li>
              <Link
                to="/"
                className="transition duration-300 hover:pl-2 hover:text-primary-light"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/menu"
                className="transition duration-300 hover:pl-2 hover:text-primary-light"
              >
                Menu
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="transition duration-300 hover:pl-2 hover:text-primary-light"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/Adminlogin"
                className="transition duration-300 hover:pl-2 hover:text-primary-light"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        {/* OPENING HOURS */}
        <div>
          <h3 className="text-lg font-bold text-primary-light">
            Opening Hours
          </h3>

          <div className="mt-2 h-1 w-10 rounded-full bg-blush-light" />

          <ul className="mt-6 space-y-4 text-sm text-text-muted">
            <li className="flex justify-between gap-3">
              <span>Monday – Friday</span>

              <span className="font-semibold text-botanical">5 PM – 9 PM</span>
            </li>

            <li className="flex justify-between gap-3">
              <span>Saturday</span>

              <span className="font-semibold text-botanical">5 PM – 10 PM</span>
            </li>

            <li className="flex justify-between gap-3">
              <span>Sunday</span>

              <span className="font-semibold text-botanical">5 PM – 8 PM</span>
            </li>
          </ul>

          <p className="mt-5 rounded-xl bg-surface-soft p-3 text-xs leading-5 text-text-secondary">
            Please confirm our actual opening hours before visiting.
          </p>
        </div>

        {/* CONTACT SECTION */}
        <div>
          <h3 className="text-lg font-bold text-primary-light">Get in Touch</h3>

          <div className="mt-2 h-1 w-10 rounded-full bg-blush-light" />

          <ul className="mt-6 space-y-5 text-sm text-text-muted">
            {/* ADDRESS */}
            <li className="flex items-start gap-3">
              <span className="mt-1 text-lg text-primary-light">
                <FaMapSigns />
              </span>

              <span>
                Balarampur Near-ForestRoad, Rangadih - 723143, District -
                Purulia, West Bengal, India.
              </span>
            </li>

            {/* PHONE */}
            <li className="flex items-center gap-3">
              <span className="text-xl text-botanical">
                <MdPhoneInTalk />
              </span>

              <a
                href="tel:+919382662130"
                className="transition duration-300 hover:text-primary-light"
              >
                +91 9382662130
              </a>
            </li>

            {/* EMAIL */}
            <li className="flex items-center gap-3">
              <span className="text-xl text-botanical">
                <MdEmail />
              </span>

              <a
                href="mailto:hello@floracafe.com"
                className="break-all transition duration-300 hover:text-primary-light"
              >
                hello@floracafe.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="relative border-t border-border-soft bg-footer-bottom/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center text-xs text-text-secondary sm:px-10 md:flex-row md:px-12 md:text-sm">
          <p>© {new Date().getFullYear()} Flora Cafe. All rights reserved.</p>

          <p>
            Made with <span className="text-primary-light">♥</span> and coffee.
          </p>

          <a
            href="#home"
            className="font-semibold text-primary-light transition duration-300 hover:text-botanical"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

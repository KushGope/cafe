
import { Link } from "react-router-dom";
import { FaMapSigns, FaInstagram, FaFacebookF, FaLeaf } from "react-icons/fa";
import { MdPhoneInTalk, MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#fffaf5] text-[#55443d]">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#fce4ec]/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#e2f0df]/70 blur-3xl" />

      {/* Main Footer */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:gap-10 lg:px-12">

        {/* Brand Section */}
        <div>
          <h2
            className="text-4xl font-bold tracking-wide text-[#b76e79]"
            style={{ fontFamily: "var(--font-flowmery)" }}
          >
            Flora Cafe
          </h2>

          <div className="mt-3 flex items-center gap-2 text-[#9aaf87]">
            <FaLeaf />
            <span className="h-px w-12 bg-[#c5d5b5]" />
            <FaLeaf />
          </div>

          <p className="mt-5 max-w-xs text-sm leading-7 text-[#77665e]">
            Sometimes, You just need a cup of coffee and a moment to yourself.
            At Flora Cafe, we provide the perfect environment for you to relax,
            recharge, and enjoy the simple pleasures of life.
          </p>

          <p className="mt-5 text-sm font-semibold italic text-[#b76e79]">
            Coffee. Comfort. Calm.
          </p>

          {/* Social Media */}
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/flora___cafe?utm_source=ig_web_button_share_sheet&rpxt=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8e1e5] text-[#b76e79] transition duration-300 hover:-translate-y-1 hover:bg-[#b76e79] hover:text-white"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5eee0] text-[#79956d] transition duration-300 hover:-translate-y-1 hover:bg-[#79956d] hover:text-white"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-[#b76e79]">
            Quick Links
          </h3>

          <div className="mt-2 h-1 w-10 rounded-full bg-[#e8b8c1]" />

          <ul className="mt-6 space-y-4 text-sm text-[#77665e]">
            <li>
              <Link to="/" className="transition hover:pl-2 hover:text-[#b76e79]">
                Home
              </Link>
            </li>

            <li>
              <Link to="/menu" className="transition hover:pl-2 hover:text-[#b76e79]">
                Menu
              </Link>
            </li>

            <li>
              <Link to="/contact" className="transition hover:pl-2 hover:text-[#b76e79]">
                Contact Us
              </Link>
            </li>

            <li>
              <Link to="/Adminlogin" className="transition hover:pl-2 hover:text-[#b76e79]">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-bold text-[#b76e79]">
            Opening Hours
          </h3>

          <div className="mt-2 h-1 w-10 rounded-full bg-[#e8b8c1]" />

          <ul className="mt-6 space-y-4 text-sm text-[#77665e]">
            <li className="flex justify-between gap-3">
              <span>Monday – Friday</span>
              <span className="font-semibold text-[#79956d]">
                5 PM – 9 PM
              </span>
            </li>

            <li className="flex justify-between gap-3">
              <span>Saturday</span>
              <span className="font-semibold text-[#79956d]">
                5 PM – 10 PM
              </span>
            </li>

            <li className="flex justify-between gap-3">
              <span>Sunday</span>
              <span className="font-semibold text-[#79956d]">
                5 PM – 8 PM
              </span>
            </li>
          </ul>

          <p className="mt-5 rounded-xl bg-[#f8eee7] p-3 text-xs leading-5 text-[#96786b]">
            Please confirm our actual opening hours before visiting.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold text-[#b76e79]">
            Get in Touch
          </h3>

          <div className="mt-2 h-1 w-10 rounded-full bg-[#e8b8c1]" />

          <ul className="mt-6 space-y-5 text-sm text-[#77665e]">

            <li className="flex items-start gap-3">
              <span className="mt-1 text-lg text-[#b76e79]">
                <FaMapSigns />
              </span>

              <span>
                Balarampur Near-ForestRoad, Rangadih - 723143,
                Disrict - Purulia, West Bengal, India.
              </span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-xl text-[#79956d]">
                <MdPhoneInTalk />
              </span>

              <a
                href="tel:+919382662130"
                className="transition hover:text-[#b76e79]"
              >
                +91 9382662130
              </a>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-xl text-[#79956d]">
                <MdEmail />
              </span>

              <a
                href="mailto:hello@floracafe.com"
                className="break-all transition hover:text-[#b76e79]"
              >
                hello@floracafe.com
              </a>
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-[#f0ded8] bg-[#fff5f1]/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center text-xs text-[#96786b] sm:px-10 md:flex-row md:px-12 md:text-sm">

          <p>
            © {new Date().getFullYear()} Flora Cafe. All rights reserved.
          </p>

          <p>
            Made with <span className="text-[#d77f91]">♥</span> and coffee.
          </p>

          <a
            href="#home"
            className="font-semibold text-[#b76e79] transition hover:text-[#79956d]"
          >
            Back to Top ↑
          </a>

        </div>
      </div>

    </footer>
  );
}

export default Footer;

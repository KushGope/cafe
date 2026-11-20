import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import cafeLogo from "../../assets/images/Floracafe.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Menu", to: "/menu" },
    { name: "About", to: "/about" },
    { name: "Orders", to: "/order" },
  ];

  // Listen for login/logout changes
  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("flora-auth-change", updateAuth);
    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("flora-auth-change", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setMenuOpen(false);

    window.dispatchEvent(new Event("flora-auth-change"));

    navigate("/", { replace: true });
  };

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="bg-background text-foreground">
      <nav className="sticky top-0 z-50 w-full border-b border-border-muted bg-footer/95 shadow-[0_4px_20px_rgba(183,110,121,0.10)] backdrop-blur-xl">
        {/* NAVBAR MAIN */}
        <div className="flex h-20 w-full items-center px-3 sm:h-24 sm:px-6">
          {/* LOGO ICON */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center"
          >
            <img
              src={cafeLogo}
              alt="Flora Cafe Logo"
              className="h-14 w-14 object-contain transition duration-500 hover:rotate-6 hover:scale-110 sm:h-20 sm:w-20"
            />
          </Link>

          {/* FLORA CAFE BRAND NAME */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group ml-1 shrink-0 sm:ml-3"
          >
            <h1
              className="whitespace-nowrap font-['Homemade_Apple'] text-xl tracking-wide text-primary-light transition duration-500 sm:text-2xl md:text-3xl"
              style={{
                textShadow:
                  "0 0 5px rgba(183,110,121,0.45), 0 0 12px rgba(183,110,121,0.30), 0 0 22px rgba(232,184,193,0.55)",
              }}
            >
              Flora Cafe
            </h1>
            <p className="mt-1 hidden text-center text-[8px] font-medium tracking-[3px] text-botanical sm:block">
              COFFEE. COMFORT. CALM.
            </p>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="ml-auto hidden items-center gap-5 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="relative whitespace-nowrap font-medium text-coffee transition duration-300 hover:text-primary-light after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary-light after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/cart"
              className="whitespace-nowrap font-medium text-coffee transition duration-300 hover:text-primary-light"
            >
              Cart 🛒
            </Link>
          </div>

          {/* LOGIN / LOGOUT + MOBILE MENU BUTTON */}
          <div className="ml-auto flex shrink-0 items-center gap-4 md:ml-6">
            {/* LOGIN / LOGOUT ICON */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
                className="flex items-center justify-center text-2xl text-primary-light transition duration-300 hover:scale-110 hover:text-red-600 sm:text-3xl"
              >
                <FaSignOutAlt />
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                title="Login"
                aria-label="Login"
                className="flex items-center justify-center text-2xl text-primary-light transition duration-300 hover:scale-110 hover:text-botanical sm:text-3xl"
              >
                <FaUserCircle />
              </Link>
            )}

            {/* MOBILE HAMBURGER */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl p-2 text-primary-light transition hover:bg-primary-soft md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="text-2xl" aria-hidden="true">
                {menuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-border-muted bg-footer px-4 py-3 shadow-lg md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 font-medium text-coffee transition hover:bg-primary-soft hover:text-primary-light"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/cart"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-medium text-coffee transition hover:bg-primary-soft hover:text-primary-light"
            >
              Cart 🛒
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

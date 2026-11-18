import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import adminloginimg from "../assets/images/adminloginimg.png";

import { fetchClient } from "../api/fetchClient";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.username || !formData.password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);
      // Authenticate with Spring Boot
      const response = await fetchClient("/auth/admin/login", {
        method: "POST",
        body: {
          username: formData.username,
          password: formData.password,
        },
      });
      // Verify backend response
      if (!response?.token || response?.user?.role !== "ADMIN") {
        throw new Error("Admin authentication failed.");
      }

      // Store JWT token
      localStorage.setItem("token", response.token);
      // Store user information (without password)
      localStorage.setItem("user", JSON.stringify(response.user));
      window.dispatchEvent(new Event("flora-auth-change"));

      navigate("/admin");
    } catch (err) {
      console.error("Admin login error:", err);

      setError(err.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl bg-surface shadow-2xl">
        {/* LEFT SIDE IMAGE */}
        <div className="relative hidden md:block min-h-150">
          <img
            src={adminloginimg}
            alt="Flora Cafe"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-foreground/65"></div>

          <div className="relative z-10 flex h-full flex-col justify-end p-10 text-white">
            <p className="mb-4 text-sm uppercase tracking-[4px] text-primary">
              Welcome to
            </p>

            <h1 className="text-5xl font-bold">Flora Cafe</h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">
              Manage your cafe, monitor orders, track sales and create beautiful
              experiences for your customers.
            </p>

            <p className="mt-8 text-sm italic text-primary">
              Coffee. Comfort. Calm.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14">
          {/* LOGO */}
          <div className="mb-10 text-center md:text-left">
            <Link
              to="/"
              className="text-sm text-primary transition hover:text-foreground"
            >
              Back to Website
            </Link>

            <h2 className="mt-8 text-3xl font-bold text-foreground">
              Admin Login
            </h2>

            <p className="mt-3 text-sm text-text-muted">
              Welcome back! Please login to your account.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* USERNAME / EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Username / Email Address
              </label>

              <input
                type="text"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                className="w-full rounded-xl border border-border bg-background px-4 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:text-foreground"
                  onClick={() =>
                    alert(
                      "Please contact the administrator to reset your password.",
                    )
                  }
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-border bg-background px-4 py-4 pr-16 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-primary"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
                {error}
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-foreground py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-primary-hover hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 border-t border-border pt-6 text-center">
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Flora Cafe. All rights reserved.
            </p>

            <p className="mt-2 text-xs text-primary">
              Secure Administration Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

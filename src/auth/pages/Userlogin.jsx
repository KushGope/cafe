import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthFormLayout";
import { fetchClient } from "../../api/fetchClient";
import { API_ENDPOINTS } from "../../api/endpoints";

function UserLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, phone: phoneValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.phone || !formData.password) {
      setError("Please enter your phone number and password.");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);

    try {
      const data = await fetchClient(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          username: formData.phone,
          password: formData.password,
        },
      });

      if (!data.success || !data.user) {
        throw new Error(data.message || "Login failed.");
      }

      // SAVE AUTHENTICATION DATA
      if (data.token) localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      // SAVE LOGIN STATUS FOR NAVBAR
      localStorage.setItem("floraUserLoggedIn", "true");

      // UPDATE NAVBAR IMMEDIATELY
      window.dispatchEvent(new Event("flora-auth-change"));

      console.log("Login Successful:", data);

      // REDIRECT AFTER LOGIN
      navigate("/menu", { replace: true });
    } catch (err) {
      setError(
        err.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="User Login"
      subtitle="Welcome back! Please login to your account."
      imageText={{
        badge: "Welcome to",
        description:
          "Discover delicious food, explore our menu, order your favourites and enjoy beautiful moments with Flora Cafe.",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PHONE NUMBER */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            inputMode="numeric"
            placeholder="Enter 10-digit mobile number"
            autoComplete="username"
            disabled={loading}
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
                alert("Please contact support to reset your password.")
              }
            >
              Forgot Password?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
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
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGNUP LINK */}
        <p className="pt-2 text-center text-sm text-text-muted">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default UserLogin;

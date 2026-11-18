import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthFormLayout";
import { fetchClient } from "../../api/fetchClient";
import { API_ENDPOINTS } from "../../api/endpoints";

function UserSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name || !formData.phone || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      // Using fetchClient and API_ENDPOINTS together!
      const data = await fetchClient(API_ENDPOINTS.AUTH.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          name: formData.name,
          username: formData.phone,
          password: formData.password,
        },
      });

      if (!data.success) {
        throw new Error(
          data.message || "Registration failed. Please try again.",
        );
      }

      navigate("/login");
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
      title="Create Account"
      subtitle="Sign up to get started with Flora Cafe."
      imageText={{
        badge: "Join Us at",
        description:
          "Create an account to order your favorite coffees, track your orders, and experience warm moments with us.",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* FULL NAME */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            disabled={loading}
            className="w-full rounded-xl border border-border bg-background px-4 py-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

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
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
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

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-foreground py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-primary-hover hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* LINK TO LOGIN */}
        <p className="text-center text-sm text-text-muted mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default UserSignup;

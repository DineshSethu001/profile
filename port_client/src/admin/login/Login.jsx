
import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { loginAdmin } from "./authStorage";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Back to portfolio homepage
  const handleBackHome = () => {
    navigate("/");
  };

  // Admin login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const data = await loginAdmin({
        email: email.trim(),
        password,
      });

      toast.success("Login successful 🚀");

      // Redirect to dashboard
      navigate(
        location.state?.from?.pathname || "/admin/dashboard",
        { replace: true }
      );

    } catch (error) {
      console.error("Admin login error:", error);

      toast.error(
        error.message || "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl top-10 left-10 pointer-events-none"></div>

      <div className="absolute w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl bottom-10 right-10 pointer-events-none"></div>

      {/* Back Button */}
      <button
        type="button"
        onClick={handleBackHome}
        className="absolute top-6 left-6 text-sm text-gray-400 hover:text-cyan-400 transition z-10"
      >
        ← Exit
      </button>

      {/* Login Card */}
      <div className="relative z-10 bg-[#111827]/80 backdrop-blur-md border border-cyan-500/20 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-mono text-cyan-400 tracking-widest">
            ACCESS CONTROL
          </h1>

          <p className="text-xs text-gray-400 mt-1">
            Authorized Personnel Only
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-6"></div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="text-xs text-gray-400"
            >
              IDENTITY
            </label>

            <input
              id="admin-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full mt-1 px-3 py-2 bg-[#020617] border border-gray-700 rounded-md text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="text-xs text-gray-400"
            >
              SECURITY KEY
            </label>

            <input
              id="admin-password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full mt-1 px-3 py-2 bg-[#020617] border border-gray-700 rounded-md text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition disabled:opacity-50"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-cyan-500/90 text-black font-mono py-2 rounded-md hover:bg-cyan-400 transition-all duration-200 active:scale-[0.97] shadow-[0_0_10px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "AUTHENTICATING..."
              : "▶ AUTHENTICATE"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-[10px] text-center text-gray-500 mt-6">
          System monitored • Unauthorized access will be logged
        </p>

      </div>
    </div>
  );
}

export default Login;

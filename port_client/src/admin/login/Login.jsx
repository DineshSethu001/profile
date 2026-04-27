import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginAdmin } from "./authStorage";
import toast from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackHome = () => {
    navigate("/");
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      loginAdmin({ email, password });

      // 🔐 store token (IMPORTANT if not already inside loginAdmin)
      localStorage.setItem("token", "admin_logged_in");

      window.dispatchEvent(new Event("storage"));

toast.success("Login successful 🚀");
      // ✅ correct navigation
      navigate(location.state?.from?.pathname || "/admin/dashboard", {
        replace: true,
      });
    } catch (err) {
      alert(err.message || "Login failed ❌");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white relative overflow-hidden">

  {/* 🔙 Back */}
  <button
    onClick={handleBackHome}
    className="absolute top-6 left-6 text-sm text-gray-400 hover:text-cyan-400 transition"
  >
    ← Exit
  </button>

  {/* 🔐 Card */}
  <div className="bg-[#111827]/80 backdrop-blur-md border border-cyan-500/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">

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

    {/* Form */}
    <form onSubmit={handleLogin} className="space-y-4">

      {/* Email */}
      <div>
        <label className="text-xs text-gray-400">IDENTITY</label>
        <input
          type="email"
          placeholder="Enter credentials"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-[#020617] border border-gray-700 rounded-md text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-xs text-gray-400">SECURITY KEY</label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-[#020617] border border-gray-700 rounded-md text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
        />
      </div>

      {/* Login */}
      <button
        type="submit"
        className="w-full mt-4 bg-cyan-500/90 text-black font-mono py-2 rounded-md hover:bg-cyan-400 transition-all duration-200 active:scale-[0.97] shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      >
        ▶ AUTHENTICATE
      </button>
    </form>

    {/* Footer */}
    <p className="text-[10px] text-center text-gray-500 mt-6">
      System monitored • Unauthorized access will be logged
    </p>
  </div>

  {/* 🔵 Ambient glow */}
  <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl top-10 left-10"></div>
  <div className="absolute w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl bottom-10 right-10"></div>

</div>
  );
}

export default Login;

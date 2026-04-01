import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Home } from "lucide-react";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Network error");
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200">

      <div className="w-[380px] bg-white shadow-xl rounded-2xl p-8 relative">

        {/* HOME BUTTON */}
        <button
          onClick={()=>navigate("/")}
          className="absolute top-4 left-4 flex items-center gap-1 text-sm text-gray-500 hover:text-black"
        >
          <Home size={18} />
          Home
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">
          Admin Login
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Portfolio Management Panel
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>

        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Demo login → admin@gmail.com / 123456
        </p>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  Navbar,
  Header,
  About,
  Projects,
  Contact,
  Service,
  Footer,
} from "./components";
import { Toaster } from "react-hot-toast";

import Login from "./admin/login/Login";
// import Register from "./admin/login/Register";
import Dashboard from "./admin/dashboard/Dashboard";
import { getAdminProfile } from "./admin/login/authStorage";

function HomePage() {
  return (
    <>
          <Toaster position="top-right" />

      <Navbar />
      <main>
        <Header />
        <About />
        <Service />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// 🔐 Protected Route (only logged-in users)
function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    getAdminProfile()
      .then(() => active && setStatus("authenticated"))
      .catch(() => active && setStatus("unauthenticated"));

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return <div className="min-h-screen bg-[#0f172a]" aria-label="Checking admin session" />;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

// 🚪 Public Route (only for NOT logged-in users)
function PublicAdminRoute({ children }) {
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* 🏠 Home */}
      <Route path="/" element={<HomePage />} />

      {/* 🔑 Login */}
      <Route
        path="/login"
        element={
          <PublicAdminRoute>
            <Login />
          </PublicAdminRoute>
        }
      />

      {/* 📝 Register */}
      {/* <Route
        path="/admin/register"
        element={
          <PublicAdminRoute>
            <Register />
          </PublicAdminRoute>
        }
      /> */}

      {/* 📊 Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        }
      />

      {/* ❌ Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

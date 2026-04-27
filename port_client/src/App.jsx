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
import Register from "./admin/login/Register";
import Dashboard from "./admin/dashboard/Dashboard";

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
  const isAdminLoggedIn = Boolean(localStorage.getItem("token"));
  const location = useLocation();

  if (!isAdminLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

// 🚪 Public Route (only for NOT logged-in users)
function PublicAdminRoute({ children }) {
  const isAdminLoggedIn = Boolean(localStorage.getItem("token"));

  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

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
      <Route
        path="/admin/register"
        element={
          <PublicAdminRoute>
            <Register />
          </PublicAdminRoute>
        }
      />

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
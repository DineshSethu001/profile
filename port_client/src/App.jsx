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
import Login from "./admin/login/Login";
import Register from "./admin/login/Register";
import Dashboard from "./admin/dashboard/Dashboard";

function HomePage() {
  return (
    <>
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

function ProtectedAdminRoute({ children }) {
  const isAdminLoggedIn = Boolean(localStorage.getItem("adminToken"));
  const location = useLocation();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}

function PublicAdminRoute({ children }) {
  const isAdminLoggedIn = Boolean(localStorage.getItem("adminToken"));

  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/admin/login"
        element={
          <PublicAdminRoute>
            <Login />
          </PublicAdminRoute>
        }
      />
      <Route
        path="/admin/register"
        element={
          <PublicAdminRoute>
            <Register />
          </PublicAdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

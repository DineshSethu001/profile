import {
  Header,
  Navbar,
  About,
  Projects,
  Contact,
  Footer,
  Service
} from "./components";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./admin/login/Login";
import AdminDashboard from "./admin/dashboard/page";

/* ---------- Home Page Layout ---------- */
function Home() {
  return (
    <>
      
        <Navbar />
      

      <Header />
      <About />
      <Service />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

/* ---------- App Router ---------- */
export default function App() {
  return (

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/admin/login" element={<Login />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>

  );
}
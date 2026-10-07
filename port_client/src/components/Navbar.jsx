"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "home", href: "#home" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

function BlinkingCursor() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className="inline-block w-[2px] h-[0.8em] bg-fuchsia-500 align-middle ml-[2px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.1s" }}
    />
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const handleAdminClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncAuth = () =>
      setIsAdminLoggedIn(Boolean(localStorage.getItem("token")));

    window.addEventListener("storage", syncAuth);
    window.addEventListener("focus", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("focus", syncAuth);
    };
  }, []);

  const handleNav = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#f8f7f4]/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        )}

        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => handleNav("#home")}
            className="flex items-center gap-2.5 group"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 group-hover:bg-red-500 transition-colors duration-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:bg-amber-500 transition-colors duration-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:bg-emerald-500 transition-colors duration-200" />
            </span>

            <span className="font-mono text-sm text-slate-900 font-semibold tracking-widest hidden sm:inline">
              dinesh.sh
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => handleNav(href)}
                className={`group relative font-mono text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
                  activeLink === href
                    ? "text-blue-700 bg-blue-50 font-semibold"
                    : "text-slate-800 hover:text-violet-700 hover:bg-violet-50"
                }`}
              >
                <span
                  className={`mr-1 transition-colors duration-200 ${
                    activeLink === href
                      ? "text-fuchsia-500 font-bold"
                      : "text-slate-900 group-hover:text-fuchsia-500"
                  }`}
                >
                  ./
                </span>

                {label}

                {activeLink === href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAdminClick}
              className="hidden md:flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-md border border-slate-300 text-slate-900 font-medium hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200"
            >
              <span className="text-slate-900">./</span>
              {isAdminLoggedIn ? "admin_panel" : "admin_login"}
            </button>

            <a
              href="#contact"
              onClick={() => handleNav("#contact")}
              className="hidden md:flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-md border border-indigo-400 text-indigo-700 font-semibold hover:bg-indigo-50 hover:border-violet-500 hover:text-violet-700 transition-all duration-200"
            >
              <span className="text-fuchsia-500">❯</span>
              hire_me
              <BlinkingCursor />
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-900 hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-14 left-3 right-3 z-40 bg-[#f8f7f4] border border-slate-200 rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)]"
          >
            <div className="h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500" />

            <div className="px-4 pt-3 pb-1 font-mono text-xs text-slate-700">
              <span className="text-fuchsia-500 font-bold">❯</span>{" "}
              <span className="text-slate-900 font-medium">navigate</span>
            </div>

            <div className="p-2 flex flex-col gap-0.5">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => handleNav(href)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`group flex items-center gap-2 font-mono text-sm px-3 py-2 rounded-lg transition-all duration-150 ${
                    activeLink === href
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-800 hover:text-violet-700 hover:bg-violet-50"
                  }`}
                >
                  <span
                    className={`text-xs ${
                      activeLink === href
                        ? "text-fuchsia-500 font-bold"
                        : "text-slate-900 group-hover:text-fuchsia-500"
                    }`}
                  >
                    ./
                  </span>

                  {label}

                  {activeLink === href && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
                  )}
                </motion.a>
              ))}

              <div className="border-t border-slate-200 mt-1 pt-2 px-1">
                <button
                  onClick={handleAdminClick}
                  className="w-full flex items-center justify-center gap-2 font-mono text-xs py-2 rounded-lg border border-slate-300 text-slate-900 font-medium hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200"
                >
                  <span className="text-slate-900">./</span>
                  {isAdminLoggedIn ? "admin_panel" : "admin_login"}
                </button>

                {isAdminLoggedIn && (
                  <button
                    onClick={handleAdminLogout}
                    className="w-full mt-2 flex items-center justify-center gap-2 font-mono text-xs py-2 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-all duration-200"
                  >
                    logout
                  </button>
                )}

                <a
                  href="#contact"
                  onClick={() => handleNav("#contact")}
                  className="flex items-center justify-center gap-2 font-mono text-xs py-2 rounded-lg border border-indigo-400 text-indigo-700 font-semibold hover:bg-indigo-50 hover:border-violet-500 hover:text-violet-700 transition-all duration-200"
                >
                  <span className="text-fuchsia-500">❯</span>
                  hire_me
                  <BlinkingCursor />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-14" />
    </>
  );
}

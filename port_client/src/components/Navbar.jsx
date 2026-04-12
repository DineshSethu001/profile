"use client";

import { useState, useEffect } from "react";
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
      className="inline-block w-[2px] h-[0.8em] bg-cyan-500 align-middle ml-[2px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.1s" }}
    />
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#f8f7f4]/95 backdrop-blur-md border-b border-stone-200 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        )}

        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" onClick={() => handleNav("#home")} className="flex items-center gap-2.5 group">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 group-hover:bg-red-400 transition-colors duration-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 group-hover:bg-amber-400 transition-colors duration-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 group-hover:bg-emerald-400 transition-colors duration-200" />
            </span>
            <span className="font-mono text-sm text-stone-400 tracking-widest hidden sm:inline">
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
                    ? "text-cyan-600 bg-cyan-50"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                }`}
              >
                <span className={`mr-1 transition-colors duration-200 ${
                  activeLink === href ? "text-cyan-400" : "text-stone-300 group-hover:text-stone-400"
                }`}>./</span>
                {label}
                {activeLink === href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-cyan-400/70 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => handleNav("#contact")}
              className="hidden md:flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-md border border-cyan-300 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-200"
            >
              <span className="text-cyan-500">❯</span>
              hire_me
              <BlinkingCursor />
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-md border border-stone-200 text-stone-500 hover:border-cyan-300 hover:text-cyan-600 transition-all duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={15} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
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
            className="fixed top-14 left-3 right-3 z-40 bg-[#f8f7f4] border border-stone-200 rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)]"
          >
            <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <div className="px-4 pt-3 pb-1 font-mono text-xs text-stone-400">
              <span className="text-cyan-500">❯</span>{" "}
              <span className="text-stone-500">navigate</span>
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
                      ? "bg-cyan-50 text-cyan-600"
                      : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                  }`}
                >
                  <span className={`text-xs ${activeLink === href ? "text-cyan-400" : "text-stone-300"}`}>./</span>
                  {label}
                  {activeLink === href && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </motion.a>
              ))}
              <div className="border-t border-stone-100 mt-1 pt-2 px-1">
                <a
                  href="#contact"
                  onClick={() => handleNav("#contact")}
                  className="flex items-center justify-center gap-2 font-mono text-xs py-2 rounded-lg border border-cyan-300 text-cyan-600 hover:bg-cyan-50 transition-all duration-200"
                >
                  <span>❯</span> hire_me <BlinkingCursor />
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
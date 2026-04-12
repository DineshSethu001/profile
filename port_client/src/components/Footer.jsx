"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "home", href: "#home" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Github,   href: "https://github.com/DineshSethu001",  label: "github",   hoverClass: "hover:text-stone-800 hover:border-stone-300" },
  { icon: Linkedin, href: "https://www.linkedin.com/",          label: "linkedin",  hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30" },
  { icon: Phone,    href: "https://wa.me/917339572897",         label: "whatsapp",  hoverClass: "hover:text-emerald-600 hover:border-emerald-300" },
];

function BlinkingCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="inline-block w-[2px] h-[1em] bg-cyan-500 align-middle ml-[2px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.1s" }}
    />
  );
}

function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#f0efe9] text-stone-700 overflow-hidden border-t border-stone-200">
      <DotGrid />

      {/* Subtle ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-cyan-100/50 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-violet-100/40 blur-[80px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">

        {/* TOP ROW */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-12">

          {/* Left — Brand */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-xs text-stone-400 tracking-widest">
                dinesh.sh
              </span>
            </div>

            <div className="font-mono text-sm text-stone-500">
              <span className="text-cyan-500">❯</span>{" "}
              <span className="text-stone-600">whoami</span>
            </div>

            <h2 className="font-mono text-2xl font-bold tracking-tight text-stone-800 leading-snug">
              Dinesh<span className="text-cyan-500">_</span>Codehunt
              <BlinkingCursor />
            </h2>

            <p className="font-mono text-xs text-stone-500 leading-relaxed">
              <span className="text-stone-300">// </span>
              open to freelance · startups · full-time
            </p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 border border-emerald-300 rounded-full px-3 py-1 bg-emerald-50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-emerald-700 tracking-wider">
                available for work
              </span>
            </div>
          </div>

          {/* Right — Contact + Nav */}
          <div className="flex flex-col sm:flex-row gap-12">

            {/* Contact */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.2em] mb-4">
                contact
              </p>
              <a
                href="mailto:dineshsethu15981@gmail.com"
                className="group flex items-center gap-3 font-mono text-sm text-stone-500 hover:text-cyan-600 transition-colors duration-200"
              >
                <span className="text-cyan-400 group-hover:text-cyan-600 transition-colors">@</span>
                dineshsethu15981@gmail.com
              </a>
              <a
                href="https://wa.me/917339572897"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 font-mono text-sm text-stone-500 hover:text-emerald-600 transition-colors duration-200"
              >
                <span className="text-emerald-500 group-hover:text-emerald-600 transition-colors">#</span>
                +91 73395 72897
              </a>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.2em] mb-4">
                navigate
              </p>
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 font-mono text-sm text-stone-500 hover:text-stone-800 transition-colors duration-200"
                >
                  <span className="text-stone-300 group-hover:text-cyan-500 transition-colors">./</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="font-mono text-[10px] text-stone-200 tracking-wider mb-6 overflow-hidden whitespace-nowrap select-none">
          {"─".repeat(120)}
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="font-mono text-xs text-stone-400 order-2 sm:order-1">
            <span className="text-stone-300">$ </span>
            copyright © 2026{" "}
            <span className="text-stone-600">dinesh codehunt</span>
            <span className="text-stone-300"> — all rights reserved</span>
          </p>

          <div className="flex items-center gap-1 order-1 sm:order-2">
            {SOCIALS.map(({ icon: Icon, href, label, hoverClass }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                            font-mono text-xs text-stone-400 border border-transparent
                            hover:bg-white transition-all duration-200 ${hoverClass}`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
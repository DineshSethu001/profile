"use client";

import React from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative  bg-gradient-to-b from-[#020617] to-black text-white overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full top-[-100px] left-[-120px]" />
      <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Top Section */}

        <div className="text-center py-16">

          <motion.img
            src="/images/logo.png"
            alt="Logo"
            className="mx-auto w-24 mb-4"
            whileHover={{ scale: 1.1 }}
          />

          <h3 className="text-xl font-semibold mb-2">
            Let's Build Something Amazing 🚀
          </h3>

          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            I'm open to freelance projects, startup collaborations,
            and full-time developer roles.
          </p>


          {/* Contact */}

          <div className="flex justify-center items-center gap-3 text-gray-300">

            <Mail className="w-5 h-5 text-cyan-400" />

            <span className="font-medium">
              dineshsethu15981@gmail.com
            </span>

          </div>

        </div>



        {/* Navigation Links */}

        <div className="flex justify-center gap-8 text-gray-400 mb-10">

          <a href="#home" className="hover:text-white transition">
            Home
          </a>

          <a href="#about" className="hover:text-white transition">
            About
          </a>

          <a href="#skills" className="hover:text-white transition">
            Skills
          </a>

          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>

          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>

        </div>



        {/* Divider */}

        <div className="border-t border-gray-800 mb-8"></div>



        {/* Bottom Section */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">

          <p className="text-sm text-gray-500 text-center md:text-left">
            © 2026 <span className="text-white font-semibold">Dinesh Codehunt</span>. All rights reserved.
          </p>



          {/* Social Links */}

          <div className="flex gap-6">

            <motion.a
              whileHover={{ y: -3 }}
              href="https://github.com/DineshSethu001"
              target="_blank"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <Github size={20} />
            </motion.a>

            <motion.a
              whileHover={{ y: -3 }}
              href="https://www.linkedin.com/"
              target="_blank"
              className="flex items-center gap-2 text-gray-400 hover:text-[#0A66C2] transition"
            >
              <Linkedin size={20} />
            </motion.a>

            <motion.a
              whileHover={{ y: -3 }}
              href="https://wa.me/917339572897"
              target="_blank"
              className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition"
            >
              <Phone size={20} />
            </motion.a>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
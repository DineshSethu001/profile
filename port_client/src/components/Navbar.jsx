import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, LogIn, X } from "lucide-react";

const routes = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#service" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {

  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {

    const sectionIds = routes.map((r) => r.href.replace("#", ""));

    const onScroll = () => {

      const currentY = window.scrollY;

      setVisible(!(currentY > lastScrollY.current && currentY > 100));
      lastScrollY.current = currentY;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress((currentY / height) * 100);

      for (const id of sectionIds) {

        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(id);
          break;
        }
      }

    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);

  }, []);

  return (
    <>
      {/* Scroll Progress */}

      <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">

        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-green-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />

      </div>



      {/* Navbar */}

      <motion.header
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.35 }}
        className="fixed top-4 left-0 w-full z-50 flex justify-center"
      >

        <div className="w-[92%] max-w-7xl bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">

          {/* Logo */}

          <a href="#home" className="flex items-center gap-2">

            <img
              src="/images/logo.png"
              alt="logo"
              className="w-9 h-9"
            />

            <span className="text-xl font-semibold text-[#562F00]">
              Dinesh Thanigaivel
            </span>

          </a>



          {/* Desktop Links */}

          <ul className="hidden md:flex items-center gap-10 font-medium">

            {routes.map((r) => {

              const id = r.href.replace("#", "");

              return (
                <li key={r.label}>

                  <a
                    href={r.href}
                    className={`relative transition ${
                      active === id
                        ? "text-black"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >

                    {r.label}

                    {active === id && (
                      <motion.span
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-black"
                      />
                    )}

                  </a>

                </li>
              );

            })}

          </ul>



          {/* Desktop Buttons */}

          <div className="hidden md:flex gap-3">

            <button
              onClick={() => setContactOpen(true)}
              className="px-6 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              Hire Me →
            </button>

            <Link
              to="/admin/login"
              className="px-5 py-2 rounded-full border border-green-600 text-green-700 flex items-center gap-2 hover:bg-green-600 hover:text-white transition"
            >
              <LogIn size={16} />
              Admin
            </Link>

          </div>



          {/* Mobile Button */}

          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>

        </div>

      </motion.header>



      {/* Mobile Menu */}

      <AnimatePresence>
        {open && (

          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            onClick={() => setOpen(false)}
          >

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 w-[80%] h-full bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5"
              >
                <X />
              </button>

              <ul className="mt-16 flex flex-col gap-6 text-lg">

                {routes.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      onClick={() => setOpen(false)}
                      className="text-gray-700"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}

              </ul>

              <div className="mt-10 flex flex-col gap-4">

                <button
                  onClick={() => {
                    setContactOpen(true);
                    setOpen(false);
                  }}
                  className="py-3 bg-green-600 text-white rounded-full"
                >
                  Contact Me
                </button>

                <Link
                  to="/admin/login"
                  className="py-3 border border-green-600 rounded-full text-center"
                >
                  Admin Login
                </Link>

              </div>

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>



      {/* Contact Modal */}

      <AnimatePresence>
        {contactOpen && (

          <motion.div
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center"
            onClick={() => setContactOpen(false)}
          >

            <motion.div
              className="bg-white p-6 rounded-2xl w-[90%] max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >

              <h3 className="text-lg font-semibold mb-4">
                Let’s connect
              </h3>

              <div className="flex gap-4">

                <a
                  href="mailto:dineshsethu15981@gmail.com"
                  className="flex-1 py-3 border rounded-lg text-center"
                >
                  📧 Email
                </a>

                <a
                  href="https://wa.me/917339572897"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-green-500 text-white rounded-lg text-center"
                >
                  💬 WhatsApp
                </a>

              </div>

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>
    </>
  );
}
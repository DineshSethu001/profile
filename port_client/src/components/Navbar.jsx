import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, LogIn, X } from "lucide-react";

const routes = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

/* 🧲 Magnetic Hook */
const useMagnetic = () => {
  const ref = useRef(null);

  const onMove = (e) => {
    if (window.innerWidth < 768) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return { ref, onMove, reset };
};

export default function Navbar() {

  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [visible, setVisible] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {

    const sectionIds = routes.map((r) => r.href.replace("#", ""));

    const onScroll = () => {

      const currentY = window.scrollY;

      setVisible(!(currentY > lastScrollY.current && currentY > 100));
      lastScrollY.current = currentY;

      setShowBar(true);

      clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setShowBar(false);
      }, 900);

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

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);

  }, []);

  return (
    <>
      {/* Progress Bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div className="fixed top-0 left-0 w-full h-[3px] z-[60]">

            <motion.div
              className="h-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25 }}
              style={{
                background:
                  "linear-gradient(90deg, var(--react-blue), var(--primary))",
              }}
            />

          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.header
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.3 }}
        className="fixed top-[3px] left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200"
      >

        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">

            <img
              src="/images/logo.png"
              alt="Logo"
              width={36}
              height={36}
            />

            <span className="logo-gradient font-semibold text-xl md:text-2xl">
              Dinesh Thanigaivel
            </span>

          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8">

            {routes.map((r) => {

              const id = r.href.replace("#", "");
              const magnet = useMagnetic();

              return (
                <li key={r.label}>

                  <a
                    ref={magnet.ref}
                    href={r.href}
                    onMouseMove={magnet.onMove}
                    onMouseLeave={magnet.reset}
                    className="relative text-sm font-medium"
                    style={{
                      color: active === id ? "#8A7650" : "#562F00",
                    }}
                  >

                    {r.label}

                    {active === id && (
                      <motion.span
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 h-[2px] w-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--react-blue), var(--primary))",
                        }}
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
              className="px-6 py-3 rounded-full bg-[#117554] text-white font-semibold border border-[#00ED64] hover:bg-white hover:text-[#117554] transition"
            >
              Hire Me →
            </button>

            <Link
              to="/admin/login"
              className="px-5 py-2 rounded-full border border-[#00ED64] text-[#117554] flex items-center gap-2 hover:bg-[#117554] hover:text-white transition"
            >
              <LogIn size={16} />
              Admin
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu />
          </button>

        </nav>

      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (

          <motion.div
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-[80%] bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <ul className="mt-12 flex flex-col gap-6">

                {routes.map((r) => (
                  <li key={r.label}>

                    <a
                      href={r.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium text-[#562F00]"
                    >
                      {r.label}
                    </a>

                  </li>
                ))}

              </ul>

              <div className="mt-auto flex flex-col gap-4">

                <button
                  onClick={() => {
                    setContactOpen(true);
                    setOpen(false);
                  }}
                  className="w-full py-3 rounded-full bg-[#117554] text-white"
                >
                  Hire Me →
                </button>

                <Link
                  to="/admin/login"
                  onClick={() => setOpen(false)}
                  className="w-full py-3 rounded-full border border-[#00ED64] text-[#117554] flex items-center justify-center gap-2"
                >
                  <LogIn size={16} />
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
            className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center"
            onClick={() => setContactOpen(false)}
          >

            <motion.div
              className="bg-white p-6 rounded-2xl w-[90%] max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >

              <h3 className="text-lg font-semibold text-[#117554] mb-4">
                Let’s connect
              </h3>

              <div className="flex gap-4">

                <a
                  href="mailto:dineshsethu15981@gmail.com"
                  className="flex-1 py-3 rounded-xl border text-center"
                >
                  📧 Email
                </a>

                <a
                  href="https://wa.me/917339572897"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#00ED64] text-center"
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
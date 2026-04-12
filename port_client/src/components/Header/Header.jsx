import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, AnimatePresence } from "framer-motion";

/* ── Data ───────────────────────────────────────────────────────────── */
const TECH = [
  { src: "/images/mongo.png",   name: "MongoDB", color: "#16a34a" },
  { src: "/images/express.png", name: "Express", color: "#374151" },
  { src: "/images/react.png",   name: "React",   color: "#0891b2" },
  { src: "/images/node.png",    name: "Node.js", color: "#15803d" },
];

const STATS = [
  { value: "15+", label: "projects" },
  { value: "2+",  label: "yrs exp"  },
  { value: "5★",  label: "rating"   },
];

const BOOT_LINES = [
  { text: "initializing portfolio...",     highlight: false },
  { text: "loading mern_stack modules...", highlight: false },
  { text: "connecting to dinesh.sh...",    highlight: false },
  { text: "✓ ready.",                      highlight: true  },
];

/* ── Blinking cursor ─────────────────────────────────────────────────*/
function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="inline-block w-[3px] h-[0.85em] bg-cyan-500 align-middle ml-0.5"
      style={{ opacity: on ? 1 : 0, transition: "opacity 0.08s" }}
    />
  );
}

/* ── Dot grid ────────────────────────────────────────────────────────*/
function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
      style={{
        backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

/* ── Corner brackets ─────────────────────────────────────────────────*/
function Brackets({ color = "cyan" }) {
  const c = color === "cyan" ? "bg-cyan-400/50" : "bg-violet-400/40";
  return (
    <>
      <span className={`absolute top-0 left-0 w-5 h-[1.5px] ${c}`} />
      <span className={`absolute top-0 left-0 w-[1.5px] h-5 ${c}`} />
      <span className={`absolute bottom-0 right-0 w-5 h-[1.5px] ${c}`} />
      <span className={`absolute bottom-0 right-0 w-[1.5px] h-5 ${c}`} />
    </>
  );
}

/* ── Terminal bar ────────────────────────────────────────────────────*/
function TermBar({ filename }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-red-400/80"     />
      <span className="w-2 h-2 rounded-full bg-amber-400/80"  />
      <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
      <span className="ml-2 font-mono text-[10px] text-stone-400 tracking-widest">
        {filename}
      </span>
    </div>
  );
}

/* ── Boot screen (light) ─────────────────────────────────────────────*/
function BootScreen() {
  const [shown, setShown] = useState([]);
  useEffect(() => {
    BOOT_LINES.forEach((_, i) => {
      setTimeout(() => setShown((v) => [...v, i]), i * 380);
    });
  }, []);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-[#f8f7f4] flex items-center justify-center"
    >
      <DotGrid />
      <div className="font-mono text-xs space-y-2 px-6 max-w-sm w-full">
        <p className="text-stone-400 mb-5 text-[10px] uppercase tracking-[0.25em]">
          dinesh.sh — boot
        </p>
        {BOOT_LINES.map(({ text, highlight }, i) =>
          shown.includes(i) ? (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={highlight ? "text-emerald-600" : "text-stone-500"}
            >
              <span className="text-cyan-500/80 mr-2">❯</span>
              {text}
            </motion.p>
          ) : null
        )}
      </div>
    </motion.div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────*/
const Header = () => {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{booting && <BootScreen />}</AnimatePresence>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center
                   bg-[#f8f7f4] text-stone-800 overflow-hidden"
      >
        <DotGrid />

        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px]
                        rounded-full bg-cyan-200/40 blur-[140px] z-0" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96
                        rounded-full bg-violet-200/35 blur-[130px] z-0" />

        {/* ── Layout ── */}
        <div className="relative z-10 w-[92%] max-w-7xl
                        grid lg:grid-cols-[1fr_400px] gap-10 items-center py-20">

          {/* ═══════ LEFT ═══════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col gap-7"
          >

            {/* Window bar + status */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"     />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"   />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[10px] text-stone-400 tracking-[0.2em]">
                ~/portfolio/dinesh.sh
              </span>
              <div className="ml-auto flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] text-emerald-700 tracking-wider">
                  available for work
                </span>
              </div>
            </div>

            {/* Name */}
            <div>
              <p className="font-mono text-xs text-stone-400 mb-3">
                <span className="text-cyan-500">❯</span>{" "}
                <span className="text-stone-500">echo</span> $DEVELOPER_NAME
              </p>
              <h1 className="font-mono font-bold leading-none tracking-tight">
                <span className="block text-stone-400 text-base mb-2">
                  hello, world. I'm
                </span>
                <span className="block text-5xl md:text-6xl text-stone-800">
                  Dinesh
                </span>
                <span className="block text-5xl md:text-6xl text-cyan-500">
                  Thanigaivel
                  <Cursor />
                </span>
              </h1>
            </div>

            {/* Typewriter card */}
            <div className="relative bg-white border border-stone-200 rounded-xl px-5 py-4
                            shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
              <Brackets color="cyan" />
              <p className="font-mono text-[10px] text-stone-400 mb-2">
                <span className="text-cyan-500">❯</span>{" "}
                <span className="text-stone-500">cat</span> role.txt
              </p>
              <p className="font-mono text-xl font-bold text-cyan-600 min-h-[1.75rem]">
                <Typewriter
                  words={[
                    "MERN Stack Developer",
                    "React Frontend Engineer",
                    "Node.js Backend Dev",
                    "Full Stack Web Engineer",
                  ]}
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={65}
                  deleteSpeed={38}
                  delaySpeed={2000}
                />
              </p>
              <p className="font-mono text-xs text-stone-400 mt-3 leading-relaxed">
                <span className="text-stone-300">// </span>
                Building scalable MERN apps · Helping startups ship faster
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="relative bg-white border border-stone-200 rounded-xl px-4 py-3
                             text-center overflow-hidden
                             hover:border-cyan-300 hover:shadow-[0_4px_16px_rgba(6,182,212,0.1)]
                             transition-all duration-200"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                  <p className="font-mono text-2xl font-bold text-cyan-600">{value}</p>
                  <p className="font-mono text-[9px] text-stone-400 uppercase tracking-[0.15em] mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap items-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 font-mono text-sm
                           bg-cyan-500 border border-cyan-500 text-white
                           rounded-full px-6 py-3
                           hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-200"
              >
                <span className="text-cyan-200">$</span> hire --me
              </motion.a>
              <motion.a
                href="/images/Dinesh_T.pdf"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 font-mono text-sm
                           border border-stone-200 text-stone-500 bg-white
                           rounded-full px-6 py-3
                           hover:border-stone-300 hover:text-stone-700 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-stone-300">./</span> resume.pdf
              </motion.a>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-stone-400">
                  <span className="text-cyan-400/60">$</span> scroll --down
                </span>
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-stone-400 text-xs"
                >
                  ↓
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* ═══════ RIGHT ═══════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ delay: 2.0, duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Avatar pill */}
            <div className="relative w-full flex justify-center">
              <div className="absolute -bottom-4 font-mono text-[10px] text-stone-500
                              border border-stone-200 bg-[#f8f7f4]
                              rounded-full px-4 py-1 tracking-widest whitespace-nowrap z-10">
                dinesh_codehunt.dev
              </div>
            </div>

            {/* Stack card */}
            <div className="relative w-full mt-5 bg-white border border-stone-200
                            rounded-2xl p-5 flex flex-col gap-4
                            shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <Brackets color="violet" />

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl
                              bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <TermBar filename="stack.config" />

              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.2em]">
                core.stack
              </p>

              {/* Tech badges */}
              <div className="grid grid-cols-4 gap-2">
                {TECH.map(({ src, name, color }, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -7, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                    className="group flex flex-col items-center gap-1.5
                               bg-stone-50 border border-stone-200 rounded-xl p-3
                               hover:border-stone-300 hover:bg-white
                               transition-all duration-200 cursor-default"
                  >
                    <img src={src} alt={name} className="w-8 h-8 object-contain" />
                    <span
                      className="font-mono text-[8px] tracking-wide text-stone-400
                                 group-hover:text-stone-600 transition-colors"
                      style={{ color }}
                    >
                      {name.toLowerCase()}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Mini command log */}
              <div className="border-t border-stone-100 pt-3 space-y-1.5">
                {[
                  { line: "npm install dinesh-stack", color: "text-stone-500", prefix: true  },
                  { line: "✓ 4 packages installed",   color: "text-emerald-600", prefix: false },
                  { line: "ready to ship 🚀",          color: "text-cyan-600",   prefix: false },
                ].map(({ line, color, prefix }, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 + i * 0.3 }}
                    className={`font-mono text-[10px] ${color}`}
                  >
                    {prefix && <span className="text-cyan-500/70 mr-1">❯</span>}
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-6 left-0 right-0 z-10 px-6 overflow-hidden">
          <p className="font-mono text-[10px] text-stone-200 tracking-wider whitespace-nowrap select-none">
            {"─".repeat(200)}
          </p>
        </div>
      </section>
    </>
  );
};

export default Header;
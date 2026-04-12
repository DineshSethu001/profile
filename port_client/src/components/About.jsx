import { motion } from "framer-motion";
import { infoList } from "../data/infoList";

const MERN_TOOLS = [
  { name: "MongoDB",    color: "#16a34a", icon: "https://cdn.simpleicons.org/mongodb/16a34a"    },
  { name: "Express",    color: "#374151", icon: "https://cdn.simpleicons.org/express/374151"    },
  { name: "React",      color: "#0891b2", icon: "https://cdn.simpleicons.org/react/0891b2"      },
  { name: "Node.js",    color: "#15803d", icon: "https://cdn.simpleicons.org/nodedotjs/15803d"  },
  { name: "Mongoose",   color: "#991b1b", icon: "https://cdn.simpleicons.org/mongoose/991b1b"   },
  { name: "Redux",      color: "#7c3aed", icon: "https://cdn.simpleicons.org/redux/7c3aed"      },
  { name: "Tailwind",   color: "#0891b2", icon: "https://cdn.simpleicons.org/tailwindcss/0891b2"},
  { name: "TypeScript", color: "#1d4ed8", icon: "https://cdn.simpleicons.org/typescript/1d4ed8" },
  { name: "Postman",    color: "#ea580c", icon: "https://cdn.simpleicons.org/postman/ea580c"    },
  { name: "Git",        color: "#dc2626", icon: "https://cdn.simpleicons.org/git/dc2626"        },
  { name: "GitHub",     color: "#1f2937", icon: "https://cdn.simpleicons.org/github/1f2937"     },
  { name: "JWT",        color: "#7c3aed", icon: "https://cdn.simpleicons.org/jsonwebtokens/7c3aed"},
  { name: "VS Code",    color: "#1d4ed8", icon: "https://cdn.simpleicons.org/visualstudiocode/1d4ed8"},
  { name: "Docker",     color: "#1d4ed8", icon: "https://cdn.simpleicons.org/docker/1d4ed8"     },
  { name: "Vite",       color: "#7c3aed", icon: "https://cdn.simpleicons.org/vite/7c3aed"       },
  { name: "Next.js",    color: "#111827", icon: "https://cdn.simpleicons.org/nextdotjs/111827"  },
];

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

function TermLabel({ children }) {
  return (
    <p className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.22em] mb-4">
      {children}
    </p>
  );
}

function InfoCard({ icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group relative bg-white border border-stone-200 rounded-xl p-5
                 hover:border-cyan-300 hover:shadow-[0_4px_20px_rgba(6,182,212,0.08)]
                 transition-all duration-300"
    >
      <span className="absolute top-0 left-0 w-6 h-[1.5px] bg-cyan-400/60 rounded-full" />
      <span className="absolute top-0 left-0 w-[1.5px] h-6 bg-cyan-400/60 rounded-full" />

      <div className="flex items-start gap-4">
        <div className="mt-0.5 w-8 h-8 flex items-center justify-center rounded-lg
                        bg-cyan-50 border border-cyan-200 shrink-0">
          <img src={icon} alt={title} className="w-4 h-4" />
        </div>
        <div>
          <div className="font-mono text-xs text-cyan-600 mb-0.5">
            <span className="text-stone-300">// </span>{title.toLowerCase()}
          </div>
          <p className="font-mono text-xs text-stone-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ToolBadge({ name, icon, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ y: -3, scale: 1.05 }}
      className="group flex flex-col items-center gap-2 p-3 rounded-xl
                 bg-white border border-stone-200
                 hover:border-stone-300 hover:shadow-sm transition-all duration-200 cursor-default"
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-50">
        <img src={icon} alt={name} className="w-5 h-5 object-contain" loading="lazy" />
      </div>
      <span className="font-mono text-[9px] tracking-wide text-stone-400 group-hover:text-stone-600 transition-colors">
        {name.toLowerCase()}
      </span>
    </motion.div>
  );
}

const About = () => {
  return (
    <section id="about" className="relative w-full py-24 bg-[#f8f7f4] text-stone-800 overflow-hidden">
      <DotGrid />

      {/* Subtle ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-100/60 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-100/50 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="font-mono text-sm text-stone-400 mb-3">
            <span className="text-cyan-500">❯</span>{" "}
            <span className="text-stone-500">cat</span> about.md
          </div>
          <h2 className="font-mono text-4xl font-bold tracking-tight text-stone-800">
            About<span className="text-cyan-500">_</span>Me
          </h2>
          <div className="mt-3 font-mono text-[10px] text-stone-300 uppercase tracking-[0.22em]">
            {"─".repeat(48)}
          </div>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-start">

          {/* LEFT */}
          <div className="space-y-4">
            <TermLabel>profile.info</TermLabel>
            {infoList.map(({ icon, title, description }, i) => (
              <InfoCard key={i} icon={icon} title={title} description={description} index={i} />
            ))}
          </div>

          {/* CENTER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center lg:w-72"
          >
            <div className="relative mb-6">
              <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-b from-cyan-300/40 to-violet-300/30 blur-[2px]" />
              <img
                src="/images/author.png"
                alt="Dinesh"
                className="relative w-56 rounded-2xl border border-stone-200 object-cover bg-white"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap
                              font-mono text-[10px] text-cyan-600 bg-[#f8f7f4]
                              border border-cyan-200 rounded-full px-3 py-1">
                mern_stack_dev.js
              </div>
            </div>

            <div className="mt-6 space-y-3 px-2">
              <p className="font-mono text-xs text-stone-500 leading-relaxed">
                <span className="text-stone-300">/* </span>
                Building modern web apps with clean UI, scalable architecture, and high performance.
                <span className="text-stone-300"> */</span>
              </p>
              <p className="font-mono text-xs text-cyan-600">
                <span className="text-stone-400">$ </span>
                solving real problems · shipping faster
              </p>
            </div>

            <div className="mt-6 flex gap-2 flex-wrap justify-center">
              {["MongoDB","Express","React","Node.js"].map((s) => (
                <span key={s} className="font-mono text-[9px] border border-stone-200 rounded-full px-2.5 py-1 text-stone-400 bg-white">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <div>
            <TermLabel>tools.stack</TermLabel>
            <div className="grid grid-cols-4 gap-2.5">
              {MERN_TOOLS.map((tool, i) => (
                <ToolBadge key={tool.name} {...tool} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 font-mono text-[10px] text-stone-200 tracking-wider overflow-hidden whitespace-nowrap select-none">
          {"─".repeat(120)}
        </div>
      </div>
    </section>
  );
};

export default About;
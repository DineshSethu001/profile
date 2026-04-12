import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { icon: "⚛️", tag: "frontend.dev", title: "Frontend Development", desc: "Fast, responsive, and visually engaging interfaces that keep users hooked and turn visits into real engagement." },
  { icon: "🧠", tag: "mern.stack",   title: "MERN Stack Apps",      desc: "From idea to deployment — scalable full-stack apps with clean architecture, secure APIs, and smooth UX." },
  { icon: "🎨", tag: "ui.to.code",   title: "UI to Code",           desc: "Figma designs transformed into pixel-perfect, production-ready React code that's clean, reusable, and built to scale." },
  { icon: "🚀", tag: "saas.mvp",     title: "SaaS MVP",             desc: "Launch faster with a powerful MVP built to validate ideas, attract users, and impress investors." },
  { icon: "📢", tag: "social.ads",   title: "Social Media Ads",     desc: "Scroll-stopping ad campaigns that increase reach, drive clicks, and convert attention into paying customers." },
  { icon: "🌐", tag: "web.dev",      title: "Website Development",  desc: "Modern, high-performance websites designed to build trust, rank on search engines, and convert visitors." },
  { icon: "🎬", tag: "video.edit",   title: "Video Editing",        desc: "Engaging videos crafted for reels, ads, and promotions that capture attention and keep audiences watching." },
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

const Service = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-white text-stone-800 overflow-hidden">
      <DotGrid />
      <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cyan-50 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-violet-50 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="font-mono text-sm text-stone-400 mb-3">
            <span className="text-cyan-500">❯</span>{" "}
            <span className="text-stone-500">ls</span> ./services
          </div>
          <h2 className="font-mono text-4xl font-bold tracking-tight text-stone-800">
            What<span className="text-cyan-500">_</span>I<span className="text-cyan-500">_</span>Do
          </h2>
          <p className="mt-3 font-mono text-xs text-stone-500">
            <span className="text-stone-300">// </span>
            services tailored for startups, founders, and businesses
          </p>
        </motion.div>

        {/* Two-panel layout */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">

          {/* Left — service list */}
          <div className="space-y-1.5">
            {services.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left group flex items-center gap-3 px-4 py-3 rounded-xl
                            font-mono text-sm transition-all duration-200 ${
                  active === i
                    ? "bg-cyan-50 border border-cyan-200 text-cyan-700"
                    : "border border-transparent text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                }`}
              >
                <span className={`text-xs transition-colors ${active === i ? "text-cyan-400" : "text-stone-300 group-hover:text-stone-400"}`}>
                  ./
                </span>
                <span className="text-lg leading-none">{s.icon}</span>
                <span className={active === i ? "font-medium" : ""}>{s.title}</span>
                {active === i && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right — detail card */}
          <div className="relative min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16, y: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-[#f8f7f4] border border-stone-200 rounded-2xl overflow-hidden"
              >
                {/* Top accent */}
                <div className="h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                {/* Terminal bar */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-stone-100">
                  <span className="w-2 h-2 rounded-full bg-red-400/70" />
                  <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 font-mono text-[10px] text-stone-400">
                    {services[active].tag}
                  </span>
                </div>

                <div className="p-7">
                  {/* Corner accent */}
                  <span className="absolute top-[52px] left-0 w-8 h-[1.5px] bg-cyan-400/50" />
                  <span className="absolute top-[52px] left-0 w-[1.5px] h-8 bg-cyan-400/50" />

                  <div className="text-4xl mb-5">{services[active].icon}</div>

                  <div className="font-mono text-[10px] text-cyan-500 mb-2 uppercase tracking-[0.18em]">
                    <span className="text-stone-300">// </span>
                    {services[active].tag}
                  </div>

                  <h3 className="font-mono text-xl font-bold text-stone-800 mb-3">
                    {services[active].title}
                  </h3>

                  <p className="font-mono text-xs text-stone-500 leading-relaxed">
                    {services[active].desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2
                                 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600
                                 transition-colors duration-200"
                    >
                      <span className="text-cyan-200">❯</span>
                      get_started
                    </a>
                    <div className="flex gap-1 ml-2">
                      {services.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActive(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                            active === i ? "bg-cyan-400 w-3" : "bg-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 font-mono text-[10px] text-stone-200 tracking-wider overflow-hidden whitespace-nowrap select-none">
          {"─".repeat(120)}
        </div>
      </div>
    </section>
  );
};

export default Service;
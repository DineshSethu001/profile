import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, XCircle, Loader } from "lucide-react";

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

const useMagnetic = () => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return { ref, handleMove, reset };
};

export default function Contact() {
  const [toast, setToast] = useState(null);
  const magnetic = useMagnetic();

  const onSubmit = async (event) => {
    event.preventDefault();
    setToast({ type: "loading", message: "sending..." });

    const formData = new FormData(event.target);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Webhook failed");
      setToast({ type: "success", message: "message sent 🚀" });
      event.target.reset();
    } catch {
      setToast({ type: "error", message: "something went wrong ❌" });
    }

    setTimeout(() => setToast(null), 3500);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#f8f7f4] text-stone-800 overflow-hidden">
      <DotGrid />
      <div className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 rounded-full bg-cyan-100/50 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-violet-100/40 blur-[120px]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="font-mono text-sm text-stone-400 mb-3">
            <span className="text-cyan-500">❯</span>{" "}
            <span className="text-stone-500">send</span> --message
          </div>
          <h2 className="font-mono text-4xl font-bold tracking-tight text-stone-800">
            Get<span className="text-cyan-500">_</span>In Touch
          </h2>
          <p className="mt-4 font-mono text-xs text-stone-500 leading-relaxed">
            <span className="text-stone-300">/* </span>
            Have a project in mind? Let's build something great together.
            <span className="text-stone-300"> */</span>
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
        >
          {/* Top accent */}
          <div className="h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-stone-100 bg-stone-50">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-2 font-mono text-[10px] text-stone-400 tracking-widest">contact.sh</span>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-5">

            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { name: "name", label: "your_name", type: "text" },
                { name: "email", label: "your_email", type: "email" },
              ].map(({ name, label, type }) => (
                <div key={name} className="space-y-1.5">
                  <label className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.15em]">
                    <span className="text-cyan-500">❯ </span>{label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    required
                    className="w-full font-mono text-sm bg-[#f8f7f4] border border-stone-200 rounded-lg
                               px-3 py-2.5 text-stone-700 placeholder-stone-300
                               outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100
                               transition-all duration-200"
                  />
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.15em]">
                <span className="text-cyan-500">❯ </span>your_message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full font-mono text-sm bg-[#f8f7f4] border border-stone-200 rounded-lg
                           px-3 py-2.5 text-stone-700 placeholder-stone-300
                           outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100
                           transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-1">
              <motion.button
                ref={magnetic.ref}
                onMouseMove={magnetic.handleMove}
                onMouseLeave={magnetic.reset}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex items-center gap-2 font-mono text-xs px-5 py-2.5
                           bg-cyan-500 text-white rounded-lg
                           hover:bg-cyan-600 transition-colors duration-200
                           border border-cyan-400"
              >
                <span className="text-cyan-200">❯</span>
                send_message
                <Send size={12} />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Bottom divider */}
        <div className="mt-12 font-mono text-[10px] text-stone-200 tracking-wider overflow-hidden whitespace-nowrap select-none text-center">
          {"─".repeat(60)}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-xl
                        font-mono text-xs shadow-lg border
                        ${toast.type === "success"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : toast.type === "error"
                          ? "bg-red-50 border-red-200 text-red-700"
                          : "bg-cyan-50 border-cyan-200 text-cyan-700"
                        }`}
          >
            {toast.type === "success" && <CheckCircle size={14} />}
            {toast.type === "error" && <XCircle size={14} />}
            {toast.type === "loading" && <Loader size={14} className="animate-spin" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
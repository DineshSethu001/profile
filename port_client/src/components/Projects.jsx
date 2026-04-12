import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });

  return (
    <section id="projects" className="relative py-24 bg-white text-stone-800 overflow-hidden">
      <DotGrid />
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-50 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-violet-50 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="font-mono text-sm text-stone-400 mb-3">
            <span className="text-cyan-500">❯</span>{" "}
            <span className="text-stone-500">ls</span> ./projects
          </div>
          <h2 className="font-mono text-4xl font-bold tracking-tight text-stone-800">
            My<span className="text-cyan-500">_</span>Projects
          </h2>
          <div className="mt-3 font-mono text-[10px] text-stone-300 uppercase tracking-[0.22em]">
            {"─".repeat(48)}
          </div>
        </motion.div>

        {/* Scroll arrows + cards */}
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                       w-9 h-9 flex items-center justify-center
                       bg-white border border-stone-200 rounded-full
                       text-stone-500 hover:border-cyan-300 hover:text-cyan-600
                       shadow-sm transition-all duration-200"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                       w-9 h-9 flex items-center justify-center
                       bg-white border border-stone-200 rounded-full
                       text-stone-500 hover:border-cyan-300 hover:text-cyan-600
                       shadow-sm transition-all duration-200"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer min-w-[320px] max-w-[320px]
                           bg-[#f8f7f4] border border-stone-200 rounded-2xl
                           overflow-hidden hover:border-cyan-300
                           hover:shadow-[0_8px_30px_rgba(6,182,212,0.1)]
                           transition-all duration-300 group"
              >
                {/* Corner accent */}
                <div className="relative overflow-hidden">
                  <span className="absolute top-0 left-0 w-8 h-[1.5px] bg-cyan-400/60 z-10" />
                  <span className="absolute top-0 left-0 w-[1.5px] h-8 bg-cyan-400/60 z-10" />
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="font-mono text-[10px] text-cyan-500 mb-1.5">
                    <span className="text-stone-300">./</span>project
                  </div>
                  <h3 className="font-mono text-base font-semibold text-stone-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-stone-500 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] px-2 py-0.5 rounded-full
                                   bg-white border border-stone-200 text-stone-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#f8f7f4] rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden"
            >
              {/* Modal top accent */}
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="font-mono text-[10px] text-cyan-500">
                    <span className="text-stone-400">❯ </span>cat {selectedProject.title?.toLowerCase().replace(/ /g, "_")}.md
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-7 h-7 flex items-center justify-center rounded-md border border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                {selectedProject.image && (
                  <img
                    src={selectedProject.image}
                    className="w-full h-52 object-cover rounded-xl mb-5 border border-stone-200"
                    alt={selectedProject.title}
                  />
                )}

                <h3 className="font-mono text-xl font-bold text-stone-800 mb-2">
                  {selectedProject.title}
                </h3>

                <p className="font-mono text-xs text-stone-500 leading-relaxed mb-5">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedProject.techStack?.map((tech) => (
                    <span key={tech} className="font-mono text-[9px] px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-500">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 border-t border-stone-100 pt-4">
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-lg
                                 bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200"
                    >
                      <ExternalLink size={12} /> live_demo
                    </a>
                  )}
                  {selectedProject.sourceLink && (
                    <a
                      href={selectedProject.sourceLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-lg
                                 border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-white transition-colors duration-200"
                    >
                      <Github size={12} /> source_code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
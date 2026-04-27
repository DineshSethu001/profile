import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiUrl } from "../lib/api";

const FALLBACK_IMAGE = "https://picsum.photos/400/300";

function getSafeUrl(value) {
  const normalized = String(value ?? "").trim();

  if (!normalized) {
    return "";
  }

  const lowerCased = normalized.toLowerCase();

  if (lowerCased === "undefined" || lowerCased === "null") {
    return "";
  }

  return /^https?:\/\//i.test(normalized) ? normalized : "";
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch(getApiUrl("/projects"));
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchProjects();
}, []);

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

  return (<section className="py-20 bg-gray-50" id="projects"> <div className="max-w-7xl mx-auto px-6">


    {/* Header */}
    <h2 className="text-3xl font-bold mb-10 text-gray-800">
      My <span className="text-blue-600">Projects</span>
    </h2>

    {loading ? (
      <p className="text-gray-500">Loading projects...</p>
    ) : (
      <div className="relative">

        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                     bg-white border rounded-full p-2 shadow hover:bg-gray-100"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                     bg-white border rounded-full p-2 shadow hover:bg-gray-100"
        >
          <ChevronRight size={18} />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {Array.isArray(projects) && projects.map((project) => {
            const projectImage = getSafeUrl(project.image);

            return (
              <motion.div
                key={project._id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(project)}
                className="min-w-[280px] bg-white border rounded-xl shadow-sm
                         hover:shadow-lg transition cursor-pointer overflow-hidden"
              >
                {projectImage && (
                  <img
                    src={projectImage || FALLBACK_IMAGE}
                    onError={(e) => {
                      e.target.src = FALLBACK_IMAGE;
                    }}
                    alt={project.title}
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    )}
  </div>

    {/* Modal */}
    <AnimatePresence>
      {selectedProject && (() => {
        const selectedImage = getSafeUrl(selectedProject.image);
        const liveLink = getSafeUrl(selectedProject.liveLink);
        const sourceLink = getSafeUrl(selectedProject.sourceLink);

        return (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-xl w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="mb-4 text-gray-500 hover:text-black"
                onClick={() => setSelectedProject(null)}
              >
                <X />
              </button>

              {selectedImage && (
                <img
                  src={selectedImage}
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-48 object-cover rounded mb-4"
                  alt={selectedProject.title}
                />
              )}

              <h3 className="text-xl font-bold">
                {selectedProject.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {selectedProject.description}
              </p>

              <div className="flex gap-3 mt-4">
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    <ExternalLink size={14} /> Live
                  </a>
                )}

                {sourceLink && (
                  <a
                    href={sourceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border px-4 py-2 rounded"
                  >
                    <Github size={14} /> Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  </section>


  );
};

export default Projects;

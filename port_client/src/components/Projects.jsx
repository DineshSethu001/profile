import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
const [projects, setProjects] = useState([]);
const [selectedProject, setSelectedProject] = useState(null);
const [loading, setLoading] = useState(true);
const scrollRef = useRef(null);

const fetchProjects = async () => {
try {
const res = await fetch("/api/projects");
const data = await res.json();
setProjects(data);
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

return ( <section className="py-20 bg-gray-50" id="projects"> <div className="max-w-7xl mx-auto px-6">


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
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProject(project)}
              className="min-w-[280px] bg-white border rounded-xl shadow-sm
                         hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              {project.image && (
                <img
  src={project.image || "https://picsum.photos/400/300"}
  onError={(e) => {
    e.target.src = "https://picsum.photos/400/300";
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
          ))}
        </div>
      </div>
    )}
  </div>

  {/* Modal */}
  <AnimatePresence>
    {selectedProject && (
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

          {selectedProject.image && (
            <img
              src={selectedProject.image}
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}

          <h3 className="text-xl font-bold">
            {selectedProject.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {selectedProject.description}
          </p>

          <div className="flex gap-3 mt-4">
            {selectedProject.liveLink && (
              <a
                href={selectedProject.liveLink}
                target="_blank"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                <ExternalLink size={14} /> Live
              </a>
            )}

            {selectedProject.sourceLink && (
              <a
                href={selectedProject.sourceLink}
                target="_blank"
                className="flex items-center gap-2 border px-4 py-2 rounded"
              >
                <Github size={14} /> Code
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>


);
};

export default Projects;

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollRef = useRef(null);


  /* FETCH PROJECTS */

  const fetchProjects = async () => {

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/projects`);
      const data = await res.json();

      setProjects(data);

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchProjects();
  }, []);

console.log(import.meta.env.VITE_API_URL);

  /* SCROLL */

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -420, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
  };



  return (

    <section
      id="projects"
      className="
py-24
bg-gradient-to-br from-[#020617] via-[#020024] to-black
text-white
relative
overflow-hidden
"
    >

      <div className="max-w-7xl mx-auto px-6 relative">

        <h2 className="text-4xl font-bold text-center mb-14">
          My Projects
        </h2>



        {/* LEFT ARROW */}

        <button
          onClick={scrollLeft}
          className="
absolute left-0 top-1/2 -translate-y-1/2
bg-white/10 backdrop-blur-lg
border border-white/20
p-3 rounded-full z-10
hover:bg-white/20 transition
"
        >
          <ChevronLeft size={24} />
        </button>



        {/* RIGHT ARROW */}

        <button
          onClick={scrollRight}
          className="
absolute right-0 top-1/2 -translate-y-1/2
bg-white/10 backdrop-blur-lg
border border-white/20
p-3 rounded-full z-10
hover:bg-white/20 transition
"
        >
          <ChevronRight size={24} />
        </button>



        {/* PROJECT LIST */}

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth pb-6"
        >

          {projects.map((project) => (

            <motion.div
              key={project._id}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project)}
              className="
cursor-pointer
min-w-[340px]
max-w-[340px]
bg-white/10 backdrop-blur-xl
border border-white/20
rounded-2xl
overflow-hidden
shadow-xl
transition
"
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover hover:scale-110 transition duration-500"
                  />
                )}

              </div>



              <div className="p-5">

                <h3 className="text-lg font-semibold">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                  {project.description}
                </p>



                {/* TECH STACK */}

                <div className="flex flex-wrap gap-2 mt-4">

                  {project.techStack?.map((tech) => (
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      key={tech}
                      className="
bg-white/20
text-xs
px-2 py-1
rounded
"
                    >
                      {tech}
                    </motion.span>
                  ))}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>



      {/* PROJECT MODAL */}

      <AnimatePresence>

        {selectedProject && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
fixed inset-0
bg-black/70 backdrop-blur-md
flex items-center justify-center
z-50
"
            onClick={() => setSelectedProject(null)}
          >

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="
bg-[#0f172a]
rounded-3xl
max-w-2xl
w-full
p-6
shadow-2xl
relative
border border-white/10
"
            >



              {/* CLOSE */}

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>



              {/* IMAGE */}

              {selectedProject.image && (

                <img
                  src={selectedProject.image}
                  className="w-full h-60 object-cover rounded-xl mb-5"
                />

              )}



              {/* TITLE */}

              <h3 className="text-2xl font-bold mb-3">
                {selectedProject.title}
              </h3>



              {/* DESCRIPTION */}

              <p className="text-gray-300 mb-5">
                {selectedProject.description}
              </p>



              {/* TECH */}

              <div className="flex flex-wrap gap-2 mb-6">

                {selectedProject.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/20 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}

              </div>



              {/* LINKS */}

              <div className="flex gap-4">

                {selectedProject.liveLink && (

                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    className="
bg-cyan-500
text-white
px-4 py-2
rounded-lg
hover:bg-cyan-600
"
                  >
                    Live Demo
                  </a>

                )}

                {selectedProject.sourceLink && (

                  <a
                    href={selectedProject.sourceLink}
                    target="_blank"
                    className="
bg-gray-800
text-white
px-4 py-2
rounded-lg
hover:bg-gray-900
"
                  >
                    Source Code
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
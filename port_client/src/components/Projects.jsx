import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Projects = () => {

  const [projects,setProjects] = useState([]);
  const [selectedProject,setSelectedProject] = useState(null);

  const scrollRef = useRef(null);


  /* FETCH PROJECTS */

  const fetchProjects = async () => {

    try{

      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/projects`);
      const data = await res.json();

      setProjects(data);

    }catch(err){
      console.error(err);
    }

  };

  useEffect(()=>{
    fetchProjects();
  },[]);



  /* SCROLL */

  const scrollLeft = () => {

    scrollRef.current.scrollBy({
      left:-400,
      behavior:"smooth"
    });

  };

  const scrollRight = () => {

    scrollRef.current.scrollBy({
      left:400,
      behavior:"smooth"
    });

  };



  return (

    <section id="projects" className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6 relative">

        <h2 className="text-3xl font-bold text-center mb-12">
          My Projects
        </h2>


        {/* LEFT ARROW */}

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-10 hover:bg-gray-100"
        >
          <ChevronLeft size={24}/>
        </button>



        {/* RIGHT ARROW */}

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-10 hover:bg-gray-100"
        >
          <ChevronRight size={24}/>
        </button>



        {/* PROJECTS */}

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
        >

          {projects.map((project)=>(
            
            <div
              key={project._id}
              onClick={()=>setSelectedProject(project)}
              className="cursor-pointer min-w-[320px] max-w-[320px] bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
            >

              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5">

                <h3 className="text-lg font-semibold">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  {project.description}
                </p>


                {/* TECH STACK */}

                <div className="flex flex-wrap gap-2 mt-4">

                  {project.techStack?.map((tech)=>(
                    <span
                      key={tech}
                      className="bg-gray-100 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>



      {/* PROJECT MODAL */}

      {selectedProject && (

        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={()=>setSelectedProject(null)}
        >

          <div
            onClick={(e)=>e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative"
          >


            {/* CLOSE BUTTON */}

            <button
              onClick={()=>setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={22}/>
            </button>



            {/* IMAGE */}

            {selectedProject.image && (
              <img
                src={selectedProject.image}
                className="w-full h-60 object-cover rounded-xl mb-4"
              />
            )}



            {/* TITLE */}

            <h3 className="text-2xl font-bold mb-2">
              {selectedProject.title}
            </h3>



            {/* DESCRIPTION */}

            <p className="text-gray-600 mb-4">
              {selectedProject.description}
            </p>



            {/* TECH STACK */}

            <div className="flex flex-wrap gap-2 mb-6">

              {selectedProject.techStack?.map((tech)=>(
                <span
                  key={tech}
                  className="bg-gray-100 text-xs px-2 py-1 rounded"
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
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Live Demo
                </a>
              )}

              {selectedProject.sourceLink && (
                <a
                  href={selectedProject.sourceLink}
                  target="_blank"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                >
                  Source Code
                </a>
              )}

            </div>

          </div>

        </div>

      )}

    </section>

  );
};

export default Projects;
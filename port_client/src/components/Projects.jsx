import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { getApiUrl } from "../lib/api";

function getSafeUrl(value) {
  const normalized = String(value ?? "").trim();
  return /^https?:\/\//i.test(normalized) ? normalized : "";
}

function normalizeTechStack(value) {
  const values = Array.isArray(value) ? value.flat(Infinity) : [value];

  return values
    .flatMap((item) => String(item ?? "").split(","))
    .map((item) => item.trim())
    .filter(Boolean);
}

function ProjectImage({ project, className = "" }) {
  const [failed, setFailed] = useState(false);
  const image = getSafeUrl(project.image);

  if (!image || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-cyan-950 ${className}`}>
        <span className="text-4xl font-semibold text-white/25">{project.title?.slice(0, 1) || "P"}</span>
      </div>
    );
  }

  return <img src={image} alt={`${project.title} preview`} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setLoadError(false);

    try {
      const response = await fetch(getApiUrl("/projects"));
      if (!response.ok) throw new Error("Could not load projects");

      const data = await response.json();
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (error) {
      console.error("Could not load portfolio projects:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setSelectedProject(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  return (
    <section className="scroll-mt-20 bg-slate-50 py-20 sm:py-24" id="projects">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Selected work</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Projects</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">A few things I’ve designed, built, and learned from.</p>
          </div>
          {!loading && projects.length > 0 && <p className="text-sm text-slate-500">{projects.length} project{projects.length === 1 ? "" : "s"}</p>}
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading projects">
            {[0, 1, 2].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200"><div className="h-44 rounded-t-2xl bg-slate-200" /><div className="space-y-3 p-5"><div className="h-4 w-2/3 rounded bg-slate-200" /><div className="h-3 rounded bg-slate-100" /><div className="h-3 w-4/5 rounded bg-slate-100" /></div></div>)}
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-rose-200 bg-white p-8 text-center">
            <p className="text-sm text-rose-700">Projects couldn’t be loaded. Check that the API server and database are running.</p>
            <button type="button" onClick={fetchProjects} className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Try again</button>
          </div>
        ) : projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">Projects will appear here soon.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.button
                key={project._id || project.title}
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => setSelectedProject(project)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-slate-200/80 transition-shadow hover:shadow-xl hover:shadow-slate-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="relative h-52 overflow-hidden bg-slate-800">
                  <ProjectImage project={project} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-[11px] font-medium capitalize text-white backdrop-blur">{project.category || "Project"}</span>
                  <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow transition group-hover:bg-blue-600 group-hover:text-white"><ArrowUpRight size={17} /></span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">{project.description}</p>
                  {!!normalizeTechStack(project.techStack).length && <div className="mt-4 flex flex-wrap gap-2">{normalizeTechStack(project.techStack).slice(0, 4).map((tech) => <span key={tech} className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{tech}</span>)}{normalizeTechStack(project.techStack).length > 4 && <span className="px-1 py-1 text-[11px] text-slate-500">+{normalizeTechStack(project.techStack).length - 4}</span>}</div>}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.article role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} onClick={(event) => event.stopPropagation()}>
              <div className="relative h-56 bg-slate-800 sm:h-72">
                <ProjectImage project={selectedProject} className="h-full w-full" />
                <button type="button" aria-label="Close project details" onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur transition hover:bg-slate-950"><X size={19} /></button>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{selectedProject.category || "Project"}</p>
                <h3 id="project-dialog-title" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{selectedProject.title}</h3>
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{selectedProject.description}</p>
                {!!normalizeTechStack(selectedProject.techStack).length && <div className="mt-5 flex flex-wrap gap-2">{normalizeTechStack(selectedProject.techStack).map((tech) => <span key={tech} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">{tech}</span>)}</div>}
                <div className="mt-7 flex flex-wrap gap-3">
                  {getSafeUrl(selectedProject.liveLink) && <a href={getSafeUrl(selectedProject.liveLink)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"><ExternalLink size={15} />View live</a>}
                  {(getSafeUrl(selectedProject.sourceLink) || getSafeUrl(selectedProject.githubLink)) && <a href={getSafeUrl(selectedProject.sourceLink || selectedProject.githubLink)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"><Github size={15} />Source code</a>}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

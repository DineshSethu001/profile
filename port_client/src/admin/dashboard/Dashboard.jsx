import { useEffect, useState } from "react";
import { getApiUrl } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../login/authStorage";

const ITEMS_PER_PAGE = 5;

const initialForm = {
  title: "",
  description: "",
  techStack: "",
  githubLink: "",
  liveLink: "",
  sourceLink: "",
  image: "",
  images: "",
  category: "fullstack",
  featured: false,
};

function normalizeTechStack(value) {
  const values = Array.isArray(value) ? value.flat(Infinity) : [value];

  return values
    .flatMap((item) => String(item ?? "").split(","))
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapProjectToForm(project) {
  return {
    title: project.title || "",
    description: project.description || "",
    techStack: normalizeTechStack(project.techStack).join(", "),
    githubLink: project.githubLink || "",
    liveLink: project.liveLink || "",
    sourceLink: project.sourceLink || "",
    image: project.image || "",
    images: Array.isArray(project.images) ? project.images.join(", ") : "",
    category: project.category || "fullstack",
    featured: Boolean(project.featured),
  };
}

function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

const handleLogout = async () => {
  try {
    await logoutAdmin();
  } catch (err) {
    console.error("Admin logout failed:", err);
  } finally {
    navigate("/login", { replace: true });
  }
};
  const loadProjects = async () => {
    try {
      setError("");
      const res = await fetch(getApiUrl("/projects"));

      if (!res.ok) {
        throw new Error("Failed to load projects.");
      }

      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || "Unable to fetch projects.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingProjectId(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const buildPayload = () => ({
    ...form,
    techStack: form.techStack
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    images: form.images
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const isEditing = Boolean(editingProjectId);
    const url = isEditing
      ? getApiUrl(`/projects/${editingProjectId}`)
      : getApiUrl("/projects");
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload()),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save project.");
      }

      if (isEditing) {
        setProjects((prev) =>
          prev.map((project) => (project._id === data._id ? data : project))
        );
        setSuccess("Project updated successfully.");
      } else {
        setProjects((prev) => [data, ...prev]);
        setCurrentPage(1);
        setSuccess("Project added successfully.");
      }

      resetForm();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setError("");
    setSuccess("");
    setEditingProjectId(project._id);
    setForm(mapProjectToForm(project));
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm("Delete this project permanently?");

    if (!confirmed) {
      return;
    }

    setDeletingProjectId(projectId);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(getApiUrl(`/projects/${projectId}`), {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete project.");
      }

      setProjects((prev) => prev.filter((project) => project._id !== projectId));

      if (editingProjectId === projectId) {
        resetForm();
      }

      setSuccess("Project deleted successfully.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setDeletingProjectId(null);
    }
  };

  const total = projects.length;
  const featured = projects.filter((project) => project.featured).length;
  const categories = new Set(
    projects.map((project) => project.category).filter(Boolean)
  ).size;
  const isEditing = Boolean(editingProjectId);
  const totalPages = Math.max(1, Math.ceil(projects.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  const inputClass = "mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/15";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-slate-400";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Portfolio management</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Projects</h1>
            <p className="mt-1 text-sm text-slate-400">Create and manage the work shown on your portfolio.</p>
          </div>
          <button onClick={handleLogout} className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-rose-400/50 hover:bg-rose-400/10 hover:text-rose-200">
            Log out
          </button>
        </header>

        <section className="grid gap-3 sm:grid-cols-3">
          {[
            ["Total projects", total],
            ["Featured", featured],
            ["Categories", categories],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
            </div>
          ))}
        </section>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.4fr)]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">{isEditing ? "Edit project" : "Add a project"}</h2>
                <p className="mt-1 text-sm text-slate-400">{isEditing ? "Update the details below." : "Add the details you want visitors to see."}</p>
              </div>
              {isEditing && <button type="button" onClick={resetForm} className="rounded-lg px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800">Cancel</button>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className={labelClass}>Project title<input className={inputClass} type="text" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Portfolio site" /></label>
              <label className={labelClass}>Description<textarea className={inputClass} name="description" value={form.description} onChange={handleChange} rows={4} required placeholder="What does this project do?" /></label>
              <label className={labelClass}>Tech stack<input className={inputClass} type="text" name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>Category<select className={inputClass} name="category" value={form.category} onChange={handleChange}><option value="frontend">Frontend</option><option value="backend">Backend</option><option value="fullstack">Fullstack</option><option value="mobile">Mobile</option></select></label>
                <label className="flex items-center gap-3 self-end rounded-xl border border-slate-700 bg-slate-950/50 px-3.5 py-3 text-sm text-slate-300"><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 accent-cyan-400" />Featured project</label>
              </div>
              <label className={labelClass}>Cover image URL<input className={inputClass} type="url" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" /></label>
              <label className={labelClass}>Gallery image URLs <span className="font-normal normal-case tracking-normal text-slate-500">(comma separated)</span><input className={inputClass} type="text" name="images" value={form.images} onChange={handleChange} placeholder="https://.../one.jpg, https://.../two.jpg" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>Live link<input className={inputClass} type="url" name="liveLink" value={form.liveLink} onChange={handleChange} placeholder="https://project.com" /></label>
                <label className={labelClass}>Source link<input className={inputClass} type="url" name="sourceLink" value={form.sourceLink} onChange={handleChange} placeholder="https://github.com/..." /></label>
              </div>
              {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
              {success && <p role="status" className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{success}</p>}
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={isSubmitting} className="flex-1 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? (isEditing ? "Saving…" : "Adding…") : (isEditing ? "Save changes" : "Add project")}
                </button>
                {isEditing && <button type="button" onClick={resetForm} className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800">Clear</button>}
              </div>
            </form>
          </section>

          <section className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div><h2 className="text-lg font-semibold text-white">Your projects</h2><p className="mt-1 text-sm text-slate-400">{projects.length} project{projects.length === 1 ? "" : "s"} in your portfolio</p></div>
              <button type="button" onClick={loadProjects} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800">Refresh</button>
            </div>
            {isLoading ? <p className="rounded-xl bg-slate-950/50 px-4 py-10 text-center text-sm text-slate-400">Loading projects…</p> : projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 px-4 py-12 text-center"><p className="font-medium text-slate-200">No projects yet</p><p className="mt-1 text-sm text-slate-500">Your projects will appear here after you add one.</p></div>
            ) : (
              <div className="space-y-3">
                {paginatedProjects.map((project) => (
                  <article key={project._id} className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 sm:flex-row sm:items-center">
                    <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg bg-slate-800 sm:w-28">
                      {project.image ? <img src={project.image} alt="" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <div className="flex h-full items-center justify-center text-xs text-slate-500">No image</div>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-medium text-white">{project.title}</h3><span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] capitalize text-slate-300">{project.category || "Uncategorised"}</span>{project.featured && <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-300">Featured</span>}</div>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-400">{project.description}</p>
                      {normalizeTechStack(project.techStack).length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {normalizeTechStack(project.techStack).map((tech) => <span key={tech} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-400">{tech}</span>)}
                        </div>
                      ) : <p className="mt-2 text-xs text-slate-500">No technologies listed</p>}
                    </div>
                    <div className="flex shrink-0 gap-2 sm:flex-col">
                      <button type="button" onClick={() => handleEdit(project)} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300">Edit</button>
                      <button type="button" onClick={() => handleDelete(project._id)} disabled={deletingProjectId === project._id} className="rounded-lg border border-rose-400/20 px-3 py-2 text-xs font-medium text-rose-300 transition hover:bg-rose-400/10 disabled:opacity-50">{deletingProjectId === project._id ? "Deleting…" : "Delete"}</button>
                    </div>
                  </article>
                ))}
                <div className="flex flex-col gap-3 border-t border-slate-800 pt-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                  <p>Showing {startIndex + 1}–{Math.min(endIndex, projects.length)} of {projects.length}</p>
                  {totalPages > 1 && <div className="flex items-center gap-2"><button type="button" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={safeCurrentPage === 1} className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800 disabled:opacity-40">Previous</button><span>Page {safeCurrentPage} of {totalPages}</span><button type="button" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={safeCurrentPage === totalPages} className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800 disabled:opacity-40">Next</button></div>}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;

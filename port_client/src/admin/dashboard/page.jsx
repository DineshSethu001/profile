import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";

export default function Dashboard() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [techFilter, setTechFilter] = useState("");
    const [preview, setPreview] = useState(null);

    const [page, setPage] = useState(1);
    const perPage = 6;

    const [editingId, setEditingId] = useState(null);
    const [techInput, setTechInput] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        image: null,
        liveLink: "",
        sourceLink: "",
        techStack: [],
        featured: false
    });

    const token = localStorage.getItem("adminToken");


    /* FETCH PROJECTS */

    const fetchProjects = async () => {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/projects`);
        const data = await res.json();

        setProjects(data);

    };

    useEffect(() => {
        fetchProjects();
    }, []);



    /* HANDLE INPUT */

    const handleChange = (e) => {

        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({
                ...form,
                [name]: type === "checkbox" ? checked : value
            });
        }

    };



    /* TECH STACK */

    const addTech = () => {

        if (!techInput.trim()) return;

        if (form.techStack.includes(techInput)) return;

        setForm({
            ...form,
            techStack: [...form.techStack, techInput.trim()]
        });

        setTechInput("");

    };

    const removeTech = (tech) => {

        setForm({
            ...form,
            techStack: form.techStack.filter(t => t !== tech)
        });

    };



    /* EDIT */

    const handleEdit = (project) => {

        setEditingId(project._id);

        setForm({
            title: project.title,
            description: project.description,
            image: null,
            liveLink: project.liveLink,
            sourceLink: project.sourceLink,
            techStack: project.techStack || [],
            featured: project.featured
        });

    };



    /* CREATE / UPDATE */

    const handleSubmit = async (e) => {

        e.preventDefault();

        const method = editingId ? "PUT" : "POST";

        const url = editingId
            ? `${import.meta.env.VITE_API_URL}/admin/projects/${editingId}`
            : `${import.meta.env.VITE_API_URL}/admin/projects`;

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("image", form.image);
        formData.append("liveLink", form.liveLink);
        formData.append("sourceLink", form.sourceLink);
        formData.append("featured", form.featured);

        form.techStack.forEach((tech) => {
            formData.append("techStack", tech);
        });

        await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        setForm({
            title: "",
            description: "",
            image: null,
            liveLink: "",
            sourceLink: "",
            techStack: [],
            featured: false
        });

        setEditingId(null);

        fetchProjects();

    };



    /* DELETE */

    const handleDelete = async (id) => {

        await fetch(`${import.meta.env.VITE_API_URL}/admin/projects/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        fetchProjects();

    };



    /* FEATURED */

    const toggleFeatured = async (project) => {

        await fetch(`${import.meta.env.VITE_API_URL}/admin/projects/${project._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                featured: !project.featured
            })
        });

        fetchProjects();

    };



    /* SEARCH + FILTER */

    const filteredProjects = projects.filter(p => {

        const matchSearch =
            p.title?.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase());

        const matchTech = techFilter
            ? p.techStack?.includes(techFilter)
            : true;

        return matchSearch && matchTech;

    });



    /* PAGINATION */

    const totalPages = Math.ceil(filteredProjects.length / perPage);

    const paginatedProjects = filteredProjects.slice(
        (page - 1) * perPage,
        page * perPage
    );



    /* TECH LIST */

    const techList = [
        ...new Set(projects.flatMap(p => p.techStack || []))
    ];



    /* LOGOUT */

    const logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };



    return (

       <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

  {/* SIDEBAR */}

  <div className="w-64 bg-slate-900 text-white flex flex-col p-6">

    <h2 className="text-xl font-semibold mb-10">
      Portfolio Admin
    </h2>

    <nav className="flex flex-col gap-3 text-sm">

      <button className="text-left px-3 py-2 rounded hover:bg-slate-800">
        Dashboard
      </button>

      <button className="text-left px-3 py-2 rounded hover:bg-slate-800">
        Projects
      </button>

      <button className="text-left px-3 py-2 rounded hover:bg-slate-800">
        Featured
      </button>

      <button className="text-left px-3 py-2 rounded hover:bg-slate-800">
        Analytics
      </button>

    </nav>

    <div className="mt-auto">

      <button
        onClick={logout}
        className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>

  </div>



  {/* MAIN CONTENT */}

  <div className="flex-1 flex flex-col">


    {/* HEADER */}

    <div className="sticky top-0 bg-white border-b px-10 py-4 flex justify-between items-center shadow-sm">

      <h1 className="text-2xl font-semibold text-slate-800">
        Portfolio Admin
      </h1>

      <div className="text-sm text-slate-500">
        Admin Panel
      </div>

    </div>



    {/* CONTENT AREA */}

    <div className="p-10 overflow-y-auto">


      {/* PROJECT FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white border shadow-sm rounded-xl p-6 mb-10 space-y-4"
      >

        <h2 className="text-lg font-semibold text-slate-700">
          {editingId ? "Edit Project" : "Add Project"}
        </h2>

        <input
          name="title"
          placeholder="Project title"
          value={form.title}
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="description"
          placeholder="Project description"
          value={form.description}
          onChange={handleChange}
          className="input"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="input"
        />

        <input
          name="liveLink"
          placeholder="Live link"
          value={form.liveLink}
          onChange={handleChange}
          className="input"
        />

        <input
          name="sourceLink"
          placeholder="GitHub link"
          value={form.sourceLink}
          onChange={handleChange}
          className="input"
        />



        {/* TECH INPUT */}

        <div className="flex gap-2">

          <input
            placeholder="Add tech (React, Node...)"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="input flex-1"
          />

          <button
            type="button"
            onClick={addTech}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>

        </div>



        {/* TECH TAGS */}

        <div className="flex flex-wrap gap-2">

          {form.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}

        </div>



        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
          {editingId ? "Update Project" : "Add Project"}
        </button>

      </form>



      {/* SEARCH */}

      <div className="flex gap-4 mb-8">

        <input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-1/2"
        />

        <select
          value={techFilter}
          onChange={(e) => setTechFilter(e.target.value)}
          className="input"
        >
          <option value="">All Tech</option>

          {techList.map(t => (
            <option key={t}>{t}</option>
          ))}

        </select>

      </div>



      {/* PROJECT GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {paginatedProjects.map((p) => (

          <div
            key={p._id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >

            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="h-44 w-full object-cover"
              />
            )}

            <div className="p-5">

              <h3 className="font-semibold text-lg">
                {p.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                {p.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}

              </div>

              <div className="flex justify-between mt-4">

                <button
                  onClick={() => setPreview(p)}
                  className="text-blue-600 text-sm"
                >
                  Preview
                </button>

                <div className="flex gap-2">

                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>



      {/* PAGINATION */}

      <div className="flex justify-center gap-3 mt-10">

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

      </div>


    </div>

  </div>

</div>
    );
}
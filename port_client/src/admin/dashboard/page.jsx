import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [projects,setProjects] = useState([]);

  const [techInput,setTechInput] = useState("");

  const [form,setForm] = useState({
    title:"",
    description:"",
    image:null,
    liveLink:"",
    sourceLink:"",
    techStack:[],
    featured:false
  });

  const [editingId,setEditingId] = useState(null);

  const token = localStorage.getItem("adminToken");


  /* FETCH PROJECTS */

  const fetchProjects = async () => {

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/projects`);
    const data = await res.json();

    setProjects(data);

  };

  useEffect(()=>{
    fetchProjects();
  },[]);


  /* HANDLE INPUT */

  const handleChange = (e) => {

    const {name,value,type,checked,files} = e.target;

    if(type === "file"){
      setForm({...form,image:files[0]});
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value
      });
    }

  };


  /* ADD TECH */

  const addTech = () => {

    if(!techInput.trim()) return;

    if(form.techStack.includes(techInput.trim())) return;

    setForm({
      ...form,
      techStack:[...form.techStack,techInput.trim()]
    });

    setTechInput("");

  };


  /* REMOVE TECH */

  const removeTech = (tech) => {

    setForm({
      ...form,
      techStack: form.techStack.filter(t => t !== tech)
    });

  };


  /* CREATE / UPDATE */

 const handleSubmit = async (e) => {

  e.preventDefault();

  const method = editingId ? "PUT" : "POST";

const url = editingId
  ? `http://localhost:5000/api/admin/projects/${editingId}`
  : "http://localhost:5000/api/admin/projects";

  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("image", form.image);
  formData.append("liveLink", form.liveLink);
  formData.append("sourceLink", form.sourceLink);
  formData.append("featured", form.featured);

  // important fix for tech stack
  form.techStack.forEach((tech)=>{
    formData.append("techStack", tech);
  });

  try {

    const res = await fetch(url,{
      method,
      headers:{
        Authorization:`Bearer ${token}`
      },
      body:formData
    });

    const data = await res.json();

    console.log("Saved:",data);

    setForm({
      title:"",
      description:"",
      image:null,
      liveLink:"",
      sourceLink:"",
      techStack:[],
      featured:false
    });

    setEditingId(null);

    fetchProjects();

  } catch(err){
    console.error(err);
  }

};


  /* EDIT */

  const handleEdit = (project) => {

    setEditingId(project._id);

    setForm({
      title:project.title,
      description:project.description,
      image:null,
      liveLink:project.liveLink,
      sourceLink:project.sourceLink,
      techStack:project.techStack || [],
      featured:project.featured
    });

  };


  /* DELETE */

  const handleDelete = async (id) => {

await fetch(`http://localhost:5000/api/admin/projects/${id}`,{
          method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    fetchProjects();

  };


  /* LOGOUT */

  const logout = () => {

    localStorage.removeItem("adminToken");

    navigate("/admin/login");

  };


  return (

    <div className="p-10">

      <div className="flex justify-between mb-10">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-2 rounded"
        >
          Logout
        </button>

      </div>


      {/* FORM */}

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">

        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="liveLink"
          placeholder="Live Project Link"
          value={form.liveLink}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="sourceLink"
          placeholder="GitHub Link"
          value={form.sourceLink}
          onChange={handleChange}
          className="border p-2 w-full"
        />


        {/* TECH INPUT */}

        <div>

          <input
            placeholder="Add Tech (React, Node, MongoDB)"
            value={techInput}
            onChange={(e)=>setTechInput(e.target.value)}
            className="border p-2 w-full"
          />

          <button
            type="button"
            onClick={addTech}
            className="bg-blue-600 text-white px-4 py-1 mt-2 rounded"
          >
            Add Tech
          </button>

        </div>


        {/* TECH TAGS */}

        <div className="flex flex-wrap gap-2">

          {form.techStack.map((tech)=>(
            <span
              key={tech}
              className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
            >

              {tech}

              <button
                type="button"
                onClick={()=>removeTech(tech)}
                className="text-red-500"
              >
                x
              </button>

            </span>
          ))}

        </div>


        <label className="flex gap-2">

          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />

          Featured Project

        </label>


        <button className="bg-green-600 text-white px-6 py-2 rounded">

          {editingId ? "Update Project" : "Add Project"}

        </button>

      </form>


      {/* PROJECT LIST */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

  {projects.map((p)=>(
    <div
      key={p._id}
      className="bg-white rounded-xl shadow-md border overflow-hidden flex flex-col"
    >

      {p.image && (
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-44 object-cover"
        />
      )}

      <div className="p-5 flex flex-col gap-3 flex-grow">

        <h3 className="text-lg font-semibold">
          {p.title}
        </h3>

        <p className="text-sm text-gray-600">
          {p.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {p.techStack?.map((tech)=>(
            <span
              key={tech}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 text-sm mt-2">
          <a
            href={p.liveLink}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Live
          </a>

          <a
            href={p.sourceLink}
            target="_blank"
            className="text-green-600 hover:underline"
          >
            Source
          </a>
        </div>

      </div>

      {/* ACTION BUTTONS */}

      <div className="flex justify-end gap-3 border-t p-4 bg-gray-50">

        <button
          onClick={()=>handleEdit(p)}
          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={()=>handleDelete(p._id)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>

      </div>

    </div>
  ))}

</div>



      </div>

   

  );

}
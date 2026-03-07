import { Home, Folder, Star, BarChart, LogOut } from "lucide-react";

export default function Sidebar({ onLogout }) {

return (

<div className="w-64 h-screen bg-slate-900 text-white flex flex-col p-6">

<h2 className="text-xl font-semibold mb-10">
Portfolio Admin
</h2>

<nav className="flex flex-col gap-4">

<button className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded">
<Home size={18}/> Dashboard
</button>

<button className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded">
<Folder size={18}/> Projects
</button>

<button className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded">
<Star size={18}/> Featured
</button>

<button className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded">
<BarChart size={18}/> Analytics
</button>

</nav>

<div className="mt-auto">
<button
onClick={onLogout}
className="flex items-center gap-3 bg-red-500 hover:bg-red-600 p-2 rounded w-full justify-center"
>
<LogOut size={18}/> Logout
</button>
</div>

</div>

);
}
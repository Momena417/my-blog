import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-blue-600" />
          <span className="font-semibold tracking-tight text-slate-900">Blogify</span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm ${
                isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            All Blogs
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm ${
                isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            New Blog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

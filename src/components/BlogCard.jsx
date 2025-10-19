import { Link } from "react-router-dom";

export default function BlogCard({ blog, onDelete }) {
  return (
    <article className="group rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-slate-950">
            {blog.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600 line-clamp-2">{blog.description}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Link
          to={`/new?id=${blog.id}`}
          className="px-3 py-2 rounded-xl text-sm bg-slate-900 text-white hover:bg-black focus:ring-4 focus:ring-slate-200"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(blog.id)}
          className="px-3 py-2 rounded-xl text-sm border border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Delete
        </button>
        {blog.tags?.length ? (
          <div className="ml-auto flex flex-wrap gap-2">
            {blog.tags.map((t) => (
              <span key={t} className="px-2 py-1 rounded-lg bg-slate-100 text-xs text-slate-700">
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

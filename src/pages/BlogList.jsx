import { useEffect, useMemo, useState } from "react";
import BlogCard from "../components/BlogCard";
import ConfirmDialog from "../components/ConfirmDialog";
import { loadBlogs, saveBlogs } from "../lib/storage";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [toDelete, setToDelete] = useState(null);


  useEffect(() => {
    setBlogs(loadBlogs());
  }, []);

  useEffect(() => {
    const onFocus = () => setBlogs(loadBlogs());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return blogs;
    const q = query.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [blogs, query]);

  const confirmDelete = (id) => setToDelete(id);

  // ✅ Save only when deleting
  const handleDelete = () => {
    setBlogs((prev) => {
      const next = prev.filter((b) => b.id !== toDelete);
      saveBlogs(next);
      return next;
    });
    setToDelete(null);
  };

  return (
    <section className="py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900">
              All Blogs
            </h1>
            <p className="mt-1 text-slate-600">Create, edit, and manage your posts.</p>
          </div>
          <Link
            to="/new"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-100"
          >
            New Blog
          </Link>
        </div>

        <div className="mt-6">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, description, or tag…"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-slate-300"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              🔎
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((b) => (
              <BlogCard key={b.id} blog={b} onDelete={confirmDelete} />
            ))}
          </div>
        )}

        <ConfirmDialog
          open={toDelete !== null}
          title="Delete blog?"
          message="This action can’t be undone."
          onCancel={() => setToDelete(null)}
          onConfirm={handleDelete}
        />
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-50 grid place-items-center text-blue-600">
        ✍️
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">No blogs yet</h3>
      <p className="mt-1 text-slate-600">
        Start by creating your first post. You can always edit or delete later.
      </p>
      <Link
        to="/new"
        className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black"
      >
        Create a blog
      </Link>
    </div>
  );
}

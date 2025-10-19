import { useEffect, useMemo, useState } from "react";
import { loadBlogs, saveBlogs } from "../lib/storage";
import { useNavigate, useSearchParams } from "react-router-dom";

const initial = { title: "", description: "", content: "", tags: "" };

export default function NewBlog() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const editId = params.get("id");

  useEffect(() => {
    if (editId) {
      const found = loadBlogs().find((b) => String(b.id) === String(editId));
      if (found) {
        setForm({
          title: found.title,
          description: found.description,
          content: found.content,
          tags: (found.tags || []).join(", "),
        });
      }
    }
  }, [editId]);

  const disabled = useMemo(() => !form.title.trim() || !form.description.trim(), [form]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (disabled) {
      setError("Title and description are required.");
      return;
    }

    const next = loadBlogs();
    const payload = {
      id: editId ?? Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      content: form.content.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (editId) {
      const i = next.findIndex((b) => String(b.id) === String(editId));
      if (i >= 0) next[i] = payload;
    } else {
      next.unshift(payload);
    }

    saveBlogs(next);
    navigate("/");
  };

  return (
    <section className="py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900">
            {editId ? "Edit Blog" : "Create New Blog"}
          </h1>
          <p className="mt-1 text-slate-600">
            Keep it simple: clear title, short description, optional tags.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <Field label="Title" required>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:ring-4 focus:ring-blue-100"
                placeholder="e.g. How to Start a Minimal Blog"
              />
            </Field>

            <Field label="Short Description" required hint="Shown on the card grid.">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:ring-4 focus:ring-blue-100"
                placeholder="One or two lines describing the post…"
              />
            </Field>

            <Field label="Content (optional)">
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={8}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:ring-4 focus:ring-blue-100"
                placeholder="Write your blog content here…"
              />
            </Field>

            <Field label="Tags (optional)" hint="Comma separated">
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm focus:ring-4 focus:ring-blue-100"
                placeholder="react, tailwind, tips"
              />
            </Field>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={disabled}
                className={`px-4 py-2 rounded-xl text-white focus:ring-4 focus:ring-blue-100 ${
                  disabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {editId ? "Save Changes" : "Publish"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview */}
        <div className="lg:mt-10">
          <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
          <div className="mt-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-semibold text-slate-900">{form.title || "Post title"}</h3>
            <p className="mt-1 text-slate-600">
              {form.description || "Short description will appear here."}
            </p>
            {!!form.tags.trim() && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t) => (
                    <span key={t} className="px-2 py-1 rounded-lg bg-slate-100 text-xs text-slate-700">
                      #{t}
                    </span>
                  ))}
              </div>
            )}
            {form.content && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 whitespace-pre-wrap">
                {form.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, hint, required, children }) {
  return (
    <label className="block">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-800">{label}</span>
        {required && <span className="text-red-500">*</span>}
        {hint && <span className="text-xs text-slate-500">— {hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export default function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

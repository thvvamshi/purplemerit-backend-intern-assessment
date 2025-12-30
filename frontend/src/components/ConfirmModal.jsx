export default function ConfirmModal({ open, title, onConfirm, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded space-y-4">
        <p>{title}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm} className="text-red-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

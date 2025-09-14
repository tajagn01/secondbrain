export default function Modal({ title, children, onClose, actions }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white w-[92vw] max-w-md rounded-2xl shadow-xl p-5 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>
        {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
        <div className="mb-4">{children}</div>
        {actions && <div className="flex gap-2 justify-end">{actions}</div>}
      </div>
    </div>
  );
}


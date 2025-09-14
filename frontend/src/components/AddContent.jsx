import { useState } from "react";

export function AddContent({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleAdd = () => {
    if (!title || !link) {
      alert("Please enter both title and link.");
      return;
    }
  onAdd({ title, url: link }); // pass new content back to parent (url prop for Card)
    setTitle("");
    setLink("");
    onClose(); // close after adding
  };

  return (
   <div
  className="fixed inset-0 flex items-center justify-center bg-black/20"
  onClick={onClose}
>

      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Content</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter link"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}

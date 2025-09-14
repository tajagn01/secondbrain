import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";

export default function AddContentCard() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => api.addContent({ title, link, type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      setTitle("");
      setLink("");
      setType("");
    }
  });

  const canSubmit = Boolean(title && link);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
      <div className="text-lg font-semibold text-gray-800 mb-3">Add New Content</div>
      {error && <div className="text-sm text-red-600 mb-2">{error.message}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring" value={title} onChange={e => setTitle(e.target.value)} placeholder="Video, Article, Tweet..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring" value={type} onChange={e => setType(e.target.value)}>
            <option value="">Auto-detect</option>
            <option value="youtube">YouTube</option>
            <option value="twitter">Twitter / X</option>
            <option value="link">Link</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Link</label>
          <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring" value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
        </div>
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-purple-600 text-white rounded font-semibold disabled:opacity-60" disabled={!canSubmit || isPending} onClick={() => mutate()}>
          {isPending ? 'Adding...' : 'Add Content'}
        </button>
      </div>
    </div>
  );
}


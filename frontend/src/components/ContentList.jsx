import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import { deriveTypeFromLink } from "../utils/content";
import { dateFromObjectIdHex } from "../utils/date";

function Tag({ children }) {
  return <span className="inline-block text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded">{children}</span>
}

export default function ContentList() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ["content"], queryFn: api.getContent });
  const { mutate: deleteItem, isPending: deletingId } = useMutation({
    mutationFn: (id) => api.deleteContent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["content"] })
  });

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    const items = data?.content || [];
    return items.filter((it) => {
      const computedType = deriveTypeFromLink(it.link);
      const matchesSearch = !search || (it.title?.toLowerCase().includes(search.toLowerCase()) || it.link?.toLowerCase().includes(search.toLowerCase()));
      const matchesType = !type || (type === computedType);
      return matchesSearch && matchesType;
    });
  }, [data, search, type]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold text-gray-800">Your Content</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <input className="px-3 py-2 border rounded-lg focus:outline-none focus:ring" placeholder="Search title or link" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring" value={type} onChange={e => setType(e.target.value)}>
          <option value="">All types</option>
          <option value="youtube">YouTube</option>
          <option value="twitter">Twitter / X</option>
          <option value="link">Link</option>
        </select>
        <div className="flex items-center text-sm text-gray-500">{filtered.length} items</div>
      </div>

      {isLoading && <div className="text-gray-600">Loading...</div>}
      {error && <div className="text-red-600">{error.message}</div>}
      {!isLoading && !error && (
        <div className="divide-y">
          {filtered.map((item) => {
            const computedType = deriveTypeFromLink(item.link);
            const created = item.createdAt ? new Date(item.createdAt) : dateFromObjectIdHex(item._id);
            return (
            <div key={item._id} className="py-3 flex items-start gap-3">
              <div className="pt-0.5"><Tag>{computedType}</Tag></div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate">{item.title}</div>
                <a href={item.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 break-all">{item.link}</a>
                <div className="text-[11px] text-gray-500 mt-0.5">{created ? created.toLocaleString() : ''}</div>
              </div>
              <div className="flex items-center gap-2">
                <a className="text-sm px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded" href={item.link} target="_blank" rel="noreferrer">Open</a>
                <button className="text-sm px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded" onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          );})}
          {filtered.length === 0 && (
            <div className="text-sm text-gray-500 py-6 text-center">No items match your search.</div>
          )}
        </div>
      )}
    </div>
  );
}


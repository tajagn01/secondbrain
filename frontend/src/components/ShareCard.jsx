import { useMutation } from "@tanstack/react-query";
import { api } from "../utils/api";
import { useMemo } from "react";

export default function ShareCard() {
  const { mutate, isPending, data, error } = useMutation({ mutationFn: api.shareBrain });
  const fullUrl = useMemo(() => {
    const slug = data?.shareLink;
    if (!slug) return "";
    const origin = window.location.origin;
    return `${origin}/brain/${slug}`;
  }, [data]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
      <div className="text-lg font-semibold text-gray-800 mb-3">Share Your Brain</div>
      <p className="text-sm text-gray-600 mb-4">Generate a public link to share your saved content.</p>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 bg-purple-600 text-white rounded font-semibold disabled:opacity-60" disabled={isPending} onClick={() => mutate()}>
          {isPending ? 'Generating...' : 'Generate link'}
        </button>
      </div>
      {error && <div className="text-sm text-red-600 mt-2">{error.message}</div>}
      {fullUrl && (
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-1">Public link</div>
          <div className="flex items-center gap-2">
            <input className="flex-1 px-3 py-2 border rounded" value={fullUrl} readOnly />
            <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded" onClick={() => navigator.clipboard.writeText(fullUrl)}>Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}


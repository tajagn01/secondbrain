import Modal from "./Modal";
import { Button } from "./button";
import { useMutation } from "@tanstack/react-query";
import { api } from "../utils/api";
import { useMemo } from "react";

export default function ShareModal({ onClose }) {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: api.shareBrain
  });

  const fullUrl = useMemo(() => {
    const slug = data?.shareLink;
    if (!slug) return "";
    const origin = window.location.origin;
    return `${origin}/brain/${slug}`;
  }, [data]);

  return (
    <Modal
      title="Share your brain"
      onClose={onClose}
      actions={<Button variant="secondary" text="Close" onClick={onClose} />}
    >
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Generate a link that shows your saved content publicly.</p>
        <div className="flex gap-2">
          <Button text={isPending ? "Generating..." : "Generate link"} onClick={() => mutate()} disabled={isPending} />
        </div>
        {error && <div className="text-sm text-red-600">{error.message}</div>}
        {fullUrl && (
          <div className="mt-2">
            <div className="text-xs text-gray-500 mb-1">Public link</div>
            <div className="flex items-center gap-2">
              <input className="flex-1 px-3 py-2 border rounded" value={fullUrl} readOnly />
              <Button
                variant="secondary"
                text="Copy"
                onClick={() => {
                  navigator.clipboard.writeText(fullUrl);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}


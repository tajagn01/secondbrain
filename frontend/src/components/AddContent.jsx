import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";

export function AddContent({ onClose }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => api.addContent({ title, link, type: "auto" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      onClose();
      setTitle("");
      setLink("");
    }
  });

  const handleAdd = () => {
    if (!title || !link) return;
    mutate();
  };

  return (
    <Modal
      title="Add Content"
      onClose={onClose}
      actions={
        <>
          <Button variant="secondary" text="Cancel" onClick={onClose} />
          <Button variant="primary" text={isPending ? "Adding..." : "Add"} onClick={handleAdd} disabled={isPending || !title || !link} />
        </>
      }
    >
      {error && <div className="text-red-600 text-sm mb-2">{error.message}</div>}
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
      <div>
        <label className="block text-sm font-medium mb-1">Link</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
        />
      </div>
    </Modal>
  );
}

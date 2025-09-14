import { useState } from "react";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { ShareIcon } from "./icons/share";
import { PlusIcon } from "./icons/plus";
import { AddContent } from "./components/AddContent";
import ShareModal from "./components/ShareModal";
import "./App.css";
import { SideBar } from "./components/SideBar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./utils/api";
import { isAuthed } from "./utils/auth";

function App() {
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["content"],
    queryFn: api.getContent
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (id) => api.deleteContent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["content"] })
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm py-6 px-4 min-h-screen">
        <SideBar />
      </aside>
      {/* Mobile sidebar overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-72 bg-white shadow-lg p-4 z-50">
            <SideBar onClose={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}
      {/* Main content with navbar */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-3 sm:px-6 py-3 bg-white shadow border-b sticky top-0 z-30">
          {/* Left: Brain icon and name */}
          <div className="flex items-center gap-2">
            <span className="text-3xl select-none" role="img" aria-label="brain">🧠</span>
            <span className="text-2xl font-extrabold text-purple-700 tracking-tight select-none">secondbrain</span>
          </div>
          {/* Right: Buttons */}
          <div className="flex items-center gap-2">
            <button className="lg:hidden p-2 rounded hover:bg-gray-100" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
              <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
              <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
              <span className="block w-5 h-0.5 bg-gray-700" />
            </button>
            <Button
              variant="primary"
              text="Add Content"
              StartIcon={<PlusIcon />}
              onClick={() => setOpen(true)}
              size="md"
            />
            <Button
              variant="secondary"
              text="Share brain"
              StartIcon={<ShareIcon />}
              onClick={() => setOpenShare(true)}
              size="md"
            />
          </div>
        </nav>
        {/* Main content area */}
        <main className="flex-1 flex flex-col items-center justify-start w-full px-3 sm:px-6 lg:px-8 py-6 lg:py-10">
          {isLoading && <div className="text-gray-600">Loading your content...</div>}
          {error && <div className="text-red-600">{error.message}</div>}
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {data?.content?.map((item) => (
              <div key={item._id} className="relative group">
                <Card title={item.title} url={item.link} />
                <button
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition bg-red-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </main>
        {/* Show modal */}
        {open && <AddContent onClose={() => setOpen(false)} />}
        {openShare && <ShareModal onClose={() => setOpenShare(false)} />}
      </div>
    </div>
  );
}

export default App;

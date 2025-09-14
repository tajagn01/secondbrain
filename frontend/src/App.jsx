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
import DashboardNavbar from "./components/DashboardNavbar";
import AddContentCard from "./components/AddContentCard";
import ContentList from "./components/ContentList";
import ShareCard from "./components/ShareCard";

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
      {/* Sidebar (kept for future sections; can be hidden entirely if not needed) */}
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
        <DashboardNavbar />
        {/* Main content area */}
        <main className="flex-1 w-full px-3 sm:px-6 lg:px-8 py-6 lg:py-10">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <AddContentCard />
              <ContentList />
            </div>
            <div className="lg:col-span-1">
              <ShareCard />
            </div>
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

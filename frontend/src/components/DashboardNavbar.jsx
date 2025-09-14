import { getUsername, clearAuth, isAuthed } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const authed = isAuthed();
  const username = getUsername();
  return (
    <nav className="w-full flex items-center justify-between px-3 sm:px-6 py-3 bg-white shadow border-b sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <span className="text-3xl select-none" role="img" aria-label="brain">🧠</span>
        <span className="text-2xl font-extrabold text-purple-700 tracking-tight select-none">secondbrain</span>
      </div>
      <div className="flex items-center gap-3">
        {authed ? (
          <>
            <div className="hidden sm:block text-sm text-gray-600">{username}</div>
            <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm" onClick={() => { clearAuth(); navigate('/signin'); }}>Logout</button>
          </>
        ) : (
          <>
            <button className="px-3 py-2 bg-purple-600 text-white rounded text-sm" onClick={() => navigate('/signin')}>Login</button>
            <button className="px-3 py-2 bg-purple-100 text-purple-700 rounded text-sm" onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}


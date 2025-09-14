import { useNavigate } from "react-router-dom";
import { Twitter } from "../icons/Tweeter";
import { Youtube } from "../icons/youtube";
import { SideBarItem } from "./SideBarItem";
import { isAuthed, clearAuth, getUsername } from "../utils/auth";

export function SideBar({ onClose }) {
    const navigate = useNavigate();
    const authed = isAuthed();
    const username = getUsername();
    return (
        <div className="flex flex-col items-stretch w-full h-full gap-6">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-purple-700 tracking-tight">Menu</h2>
                {onClose && (
                    <button className="text-gray-500 hover:text-black" onClick={onClose}>✕</button>
                )}
            </div>
            <nav className="flex flex-col gap-1 w-full">
                <SideBarItem text="Twitter" icon={<Twitter />} />
                <SideBarItem text="YouTube" icon={<Youtube />} />
            </nav>
            <div className="flex-1" />
            <div className="px-2 pb-2">
                {!authed ? (
                    <div className="grid grid-cols-2 gap-2">
                        <button className="px-3 py-2 bg-purple-600 text-white rounded" onClick={() => navigate('/signin')}>Login</button>
                        <button className="px-3 py-2 bg-purple-100 text-purple-700 rounded" onClick={() => navigate('/signup')}>Sign Up</button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between gap-2">
                        <div className="text-sm text-gray-700 truncate">{username || 'Account'}</div>
                        <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm" onClick={() => { clearAuth(); navigate('/signin'); }}>Logout</button>
                    </div>
                )}
            </div>
            <div className="text-xs text-gray-400 text-center mt-auto w-full">© {new Date().getFullYear()} Personal Brain</div>
        </div>
    );
}

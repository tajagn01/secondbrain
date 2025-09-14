import React from "react";

export function SideBarItem({ text, icon }) {
    return (
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-purple-50 cursor-pointer transition w-full">
            <span className="w-6 h-6 flex items-center justify-center text-lg">{icon}</span>
            <span className="text-gray-800 font-medium text-sm">{text}</span>
        </div>
    );
}


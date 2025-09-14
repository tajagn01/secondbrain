import { useState } from "react";
import { Twitter } from "../icons/Tweeter";
import { Youtube } from "../icons/youtube";
import { SideBarItem } from "./SideBarItem";

export function SideBar() {
    return (
        <div className="flex flex-col items-center w-full h-full gap-8">
            <h2 className="text-xl font-bold text-purple-700 mb-2 tracking-tight">Sidebar</h2>
            <nav className="flex flex-col gap-4 w-full items-center">
                <SideBarItem text="Twitter" icon={<Twitter />} />
                <SideBarItem text="YouTube" icon={<Youtube />} />
            </nav>
            <div className="flex-1" />
            <div className="text-xs text-gray-400 text-center mt-auto w-full">© {new Date().getFullYear()} Personal Brain</div>
        </div>
    );
}

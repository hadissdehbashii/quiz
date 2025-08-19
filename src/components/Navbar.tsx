import React from "react";
import { Sun, RotateCcw } from "lucide-react";

export default function Navbar() {
    return (
        <div className="w-full flex items-center justify-between bg-base-200 px-8 py-3 shadow-sm">
            {/* QUIZ */}
            <div className="text-2xl font-serif tracking-[0.2em]">QUIZ</div>

            {/* تاریخ با فلش‌ها */}
            <div className="flex items-center space-x-6">
                <button className="text-lg font-light">&lt;</button>
                <span className="text-sm font-light tracking-wide">
                    1 February-2024
                </span>
                <button className="text-lg font-light">&gt;</button>
            </div>

            {/* بخش راست */}
            <div className="flex items-center gap-5">
                <button className="btn btn-square btn-ghost">
                    <Sun className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-300">
                    <RotateCcw className="w-5 h-5 text-black" />
                </div>
                <span className="text-sm font-light">Username</span>
            </div>
        </div>
    );
}

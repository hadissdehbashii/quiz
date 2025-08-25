
import { Sun, RotateCcw } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full bg-base-200 px-4 py-3 shadow-sm mt-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                {/* Top row: QUIZ and hamburger for mobile */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="text-2xl font-serif tracking-[0.2em]">QUIZ</div>
                    {/* Hamburger for mobile */}
                    <button className="md:hidden btn btn-square btn-ghost" onClick={() => {
                        const menu = document.getElementById('navbar-mobile-menu');
                        if (menu) menu.classList.toggle('hidden');
                    }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                    </button>
                </div>

                {/* تاریخ با فلش‌ها */}
                <div className="flex items-center space-x-6 justify-center mt-2 md:mt-0">
                    <button className="text-lg font-light">&lt;</button>
                    <span className="text-sm font-light tracking-wide">
                        1 February-2024
                    </span>
                    <button className="text-lg font-light">&gt;</button>
                </div>

                {/* بخش راست: desktop */}
                <div className="hidden md:flex items-center gap-5">
                    <button className="btn btn-square btn-ghost">
                        <Sun className="w-5 h-5" />
                    </button>
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-300">
                        <RotateCcw className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm font-light">Username</span>
                </div>

                {/* بخش راست: mobile menu */}
                <div id="navbar-mobile-menu" className="flex flex-col gap-3 mt-2 md:hidden hidden">
                    <button className="btn btn-square btn-ghost w-fit">
                        <Sun className="w-5 h-5" />
                    </button>
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-300">
                        <RotateCcw className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm font-light">Username</span>
                </div>
            </div>
        </nav>
    );
}

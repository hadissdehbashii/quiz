

import { Sun, Moon, Monitor, RotateCcw } from "lucide-react";
import { useThemeStore } from "../stores/themeStore";



const Navbar = () => {
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    const themeIcon = theme === "light" ? <Sun className="w-5 h-5" /> : theme === "dark" ? <Moon className="w-5 h-5" /> : <Monitor className="w-5 h-5" />;



    return (
        <div className="w-full flex items-center justify-between bg-base-300 px-8 py-3 shadow-sm">
            <div className="text-2xl font-serif tracking-[0.2em]">QUIZ</div>

            <div className="hidden md:flex items-center space-x-6 ">
                <button className="text-lg font-light">&lt;</button>
                <span className="text-sm font-light tracking-wide">
                    1 February-2024
                </span>
                <button className="text-lg font-light">&gt;</button>
            </div>

            <div className="flex items-center gap-5">
                <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-square btn-ghost" aria-label="Theme toggle">
                        {themeIcon}
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36">
                        <li><button onClick={() => setTheme('light')} className={theme === 'light' ? 'active' : ''}><Sun className="w-4 h-4 mr-2" />Light</button></li>
                        <li><button onClick={() => setTheme('dark')} className={theme === 'dark' ? 'active' : ''}><Moon className="w-4 h-4 mr-2" />Dark</button></li>
                        <li><button onClick={() => setTheme('system')} className={theme === 'system' ? 'active' : ''}><Monitor className="w-4 h-4 mr-2" />System</button></li>
                    </ul>
                </div>

                <div className="hidden md:flex items-center gap-5">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-300">
                        <RotateCcw className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm font-light">Username</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar


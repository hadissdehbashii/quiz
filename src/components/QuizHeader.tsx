import { Link } from "react-router";

export default function QuizHeader() {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full px-4 md:px-8 py-3 gap-4 md:gap-0">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 text-sm">
                    <div className="flex items-center gap-2">
                        <Link to="/dashboard" className="underline text-gray-700 text-base md:text-sm">
                            Quiz Dashboard
                        </Link>
                        <span className="text-lg md:text-base">››</span>
                        <Link to="/quiz/new" className="text-indigo-900 font-medium text-base md:text-sm">
                            New Quiz
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
                    <span className="text-base font-medium">Status</span>
                    <input
                        type="checkbox"
                        className="toggle border-2" style={{ accentColor: '#6F42C1' }}
                        defaultChecked
                    />
                    <span className="text-sm text-gray-500">
                        Your post will be saved as a public
                    </span>
                </div>
            </div>

            {/* Internal pages will be rendered by Layout's <Outlet /> */}
        </div>
    );
}

import { Link } from "react-router";

export default function QuizHeader() {
    return (
        <div>
            <div className="flex items-center justify-between w-full px-8 py-3 ">
                <div className="flex items-center space-x-2 text-sm">
                    <Link to="/dashboard" className="underline text-gray-700">
                        Quiz Dashboard
                    </Link>
                    <span className="text-lg">››</span>
                    <Link to="/quiz/new" className="text-indigo-900 font-medium">
                        New Quiz
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-base font-medium">Status</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-success"
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

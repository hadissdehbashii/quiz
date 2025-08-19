import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import QuizHeader from "./QuizHeader";

export default function Layout() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      {location.pathname === "/quiz/new" && <QuizHeader />}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

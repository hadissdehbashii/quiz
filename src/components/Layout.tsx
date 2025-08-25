import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import QuizHeader from "./QuizHeader";
import MobileFooter from "./MobileFooter";

export default function Layout() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      {location.pathname === "/quiz/new" && <QuizHeader />}
      <main className="p-6">
        <Outlet />
        <MobileFooter/>
      </main>
    </div>
  );
}

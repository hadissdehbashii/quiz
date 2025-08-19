import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NewQuiz from "./pages/NewQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "quiz/new", element: <NewQuiz /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

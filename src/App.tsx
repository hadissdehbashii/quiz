import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NewQuiz from "./pages/NewQuiz";
import EditQuiz from "./pages/EditQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "quiz/new", element: <NewQuiz /> },
      { path: "quiz/edit/:id", element: <EditQuiz /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

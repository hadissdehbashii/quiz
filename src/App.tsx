import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import NewQuiz from "./pages/NewQuiz";

import EditQuiz from "./pages/EditQuiz";

import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "quiz/new", element: <NewQuiz /> },
      { path: "quiz/edit/:id", element: <EditQuiz /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

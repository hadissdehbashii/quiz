import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import NewQuiz from "./pages/NewQuiz";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import History from "./pages/History";


import EditQuiz from "./pages/EditQuiz";


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
      { path: "history", element: <History/> },
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

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Admin from "../admin";
import HomePage from "../pages/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
]);
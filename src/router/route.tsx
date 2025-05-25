import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";

import Login from "../pages/auth/Login";

import HomePage from "../pages/home/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import Admin from "../admin";
import Register from "../pages/auth/Register";
import DetelProduct from "../pages/detel/DetelProduct";
import Cart from "../pages/Cart/Cart";
import Allproduct from "../pages/ProductAll/Allproduct";
 // <- import bảo vệ route

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/detel",
        element: <DetelProduct />,
      },
       {
        path: "/cart",
        element: <Cart />,
      },
        {
        path: "/allproduct",
        element: <Allproduct />,
      },

    ],
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <Admin />
      </ProtectedRoute>
    ),
  },
]);

import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import BookManager from "../pages/admin/BookManager";
import OrderManager from "../pages/admin/OrderManager";
import UserManager from "../pages/admin/UserManager";
import CategoriesManager from "../pages/admin/CategoriesManager";
import AuthorManager from "../pages/admin/AuthorManager";
import DiscountManager from "../pages/admin/DiscountManager";
import RoleManager from "../pages/admin/RoleManager";
import AdminLayout from "../components/layoutAdmin/layout";

const adminRoutes: RouteObject = {
  path: "admin",
  element: <AdminLayout />,
  children: [
    { path: "", element: <Dashboard /> },
    { path: "books", element: <BookManager /> },
    { path: "orders", element: <OrderManager /> },
    { path: "users", element: <UserManager /> },
    { path: "categories", element: <CategoriesManager /> },
    { path: "authors", element: <AuthorManager /> },
    { path: "discounts", element: <DiscountManager /> },
    { path: "roles", element: <RoleManager /> },
  ],
};

export default adminRoutes;

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../pages/auth/Login";
import HomePage from "../pages/home/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import Admin from "../admin";
import Register from "../pages/auth/Register";
import EmailOTPVerification from "../pages/auth/EmailOTPVerification";
import DetelProduct from "../pages/detel/DetelProduct";
import Cart from "../pages/Cart/Cart";
import Allproduct from "../pages/ProductAll/Allproduct";
import ContactPage from "../pages/Contant/LienHe";
import ProductByCategory from "../pages/home/components/ProductByCategory";
import Wishlist from "../pages/Wishlist/Wishlist";
import { SearchPage } from "../pages/Search/SearchPage";
import Checkout from "../pages/checkout/Checkout";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Orders from "../pages/Orders/Orders";
import VNPayReturnPage from "../pages/payment/VNPayReturn";
import TestVNPay from "../pages/TestVNPay";
import BlogPage from "../pages/Blog/BlogPage";
import ProfilePage from "../pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "detail/:id", element: <DetelProduct /> },
      { path: "cart", element: <Cart /> },
      { path: "allproduct", element: <Allproduct /> },
      { path: "contant", element: <ContactPage /> },
      { path: "category/:categoryId", element: <ProductByCategory /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "search", element: <SearchPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "orders", element: <Orders /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "payment/vnpay-return", element: <VNPayReturnPage /> },
    ],
  },
  { path: "/test-vnpay", element: <TestVNPay /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/verify-otp", element: <EmailOTPVerification /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <Admin />
      </ProtectedRoute>
    ),
  },
]);
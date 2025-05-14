import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, useRoutes } from "react-router-dom";
import "antd/dist/reset.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/login";

function App() {

  const routes = useRoutes([
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },

  ]);

  return routes;
}

export default App;

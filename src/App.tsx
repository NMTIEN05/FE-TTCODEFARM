import React, { useEffect } from 'react';
import axios from 'axios';
import { useRoutes } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import adminRoutes from './router/admin.router';

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/ping")
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  const routes = useRoutes([
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    adminRoutes, // gộp admin routes vào đây
  ]);

  return routes;
}

export default App;

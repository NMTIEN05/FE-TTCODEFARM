import React, { useEffect } from 'react';
import axios from 'axios';
import { useRoutes } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

function App() {
 
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/ping")  // Kiểm tra URL có chính xác không
      .then(response => {
        console.log(response.data.message);  // In ra thông báo từ backend
      })
      .catch(error => {
        console.error("Lỗi khi gọi API:", error);  // Hiển thị lỗi khi gọi API
      });
  }, []);
const routes = useRoutes([
  {path: '/register', element:<Register/>},
  {path: '/login', element:<Login/>},
])
  return routes;
}
export default App;

import { RouterProvider } from 'react-router-dom';
import React, { useEffect } from 'react';
import { router } from './router/route';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './providers/CartProvider';
import { WishlistProvider } from './providers/WishlistProvider';

const App:React.FC = () => {
    
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
  return (
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </CartProvider>
    </WishlistProvider>
  )

}
export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchCart = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const userId = user?._id;

      if (!userId) return;

      const res = await axios.get(`http://localhost:8888/api/cart/${userId}`);
      const result = res.data?.data?.data?.items || [];
      const filteredItems = result.filter((item: any) => item.book_id);
      setCartItems(filteredItems);

      const total = filteredItems.reduce(
        (sum: number, item: any) => sum + item.book_id.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId: string, newQty: number) => {
    try {
      // Cập nhật ngay trên UI
      const updated = cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQty } : item
      );
      setCartItems(updated);

      // Gọi API cập nhật
      await axios.put(`http://localhost:8888/api/cart-update/${itemId}`, {
        quantity: newQty,
      });

      // Cập nhật lại tổng
      const total = updated.reduce(
        (sum: number, item: any) => sum + item.book_id.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const deleteItem = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:8888/api/cart-remove/${itemId}`);
      fetchCart();
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
          <ArrowLeft className="w-5 h-5" />
          <span>Tiếp tục mua sắm</span>
        </button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart /> Giỏ hàng
        </h1>
      </div>

      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.book_id?.cover_image || "/fallback.jpg"}
                alt={item.book_id?.title || "Không có tiêu đề"}
                className="w-20 h-28 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.book_id?.title}</h2>
                <p className="text-sm text-gray-600">{item.book_id?.author}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="p-1"
                    onClick={() =>
                      item._id &&
                      item.quantity > 1 &&
                      updateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    <Minus />
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="p-1"
                    onClick={() =>
                      item._id &&
                      updateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-red-600">
                {(item.book_id?.price * item.quantity).toLocaleString()}đ
              </p>
              <button
                className="text-gray-500 hover:text-red-600 mt-2"
                onClick={() => item._id && deleteItem(item._id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 border-t">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Tổng tiền:</span>
          <span className="text-red-600">{totalPrice.toLocaleString()}đ</span>
        </div>
        <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
          <CreditCard /> Thanh toán ngay
        </button>
      </div>
    </div>
  );
};

export default Cart;

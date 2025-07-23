import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface UserProfile {
  _id: string;
  fullname: string;
  email: string;
  phone?: string;
  address?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Bạn cần đăng nhập để xem thông tin');
        setLoading(false);
        return;
      }

      // Giải mã token để lấy userId
      let userId;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.id || payload._id || payload.userId;
        console.log('Decoded token payload:', payload);
      } catch (error) {
        console.error('Lỗi giải mã token:', error);
        setError('Token không hợp lệ');
        setLoading(false);
        return;
      }

      if (!userId) {
        setError('Không tìm thấy thông tin người dùng trong token');
        setLoading(false);
        return;
      }

      console.log('Fetching user profile for userId:', userId);
      
      // Gọi API với endpoint đúng
      const response = await axios.get(`http://localhost:8888/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('API response:', response.data);
      
      // Xử lý cấu trúc dữ liệu trả về
      const userData = response.data.data || response.data;
      
      if (!userData) {
        throw new Error('Không nhận được dữ liệu người dùng');
      }
      
      setProfile(userData);
      setFormData({
        fullname: userData.fullname || '',
        phone: userData.phone || '',
        address: userData.address || '',
      });
    } catch (err) {
      console.error('Lỗi khi lấy thông tin người dùng:', err);
      setError('Không thể tải thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token || !profile?._id) return;

      await axios.put(`http://localhost:8888/auth/users/${profile._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Cập nhật thông tin thành công');
      // Cập nhật lại thông tin profile
      fetchUserProfile();
    } catch (err: any) {
      console.error('Lỗi khi cập nhật thông tin:', err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Đang tải thông tin...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="bg-red-50 p-4 rounded-lg mb-6">
          <p className="text-red-600 flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error || 'Bạn cần đăng nhập để xem thông tin'}
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/auth/login'}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <User className="w-6 h-6" />
        Thông tin cá nhân
      </h1>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg mb-6">
          <p className="text-red-600 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-green-600 flex items-center gap-2">
            <Save className="w-5 h-5" />
            {success}
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <span>{profile.email}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Email không thể thay đổi</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-gray-100 p-2">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="flex-1 px-3 py-2 focus:outline-none"
                placeholder="Nhập họ tên"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-gray-100 p-2">
                <Phone className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 px-3 py-2 focus:outline-none"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <div className="flex items-start border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-gray-100 p-2">
                <MapPin className="w-5 h-5 text-gray-500" />
              </div>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="flex-1 px-3 py-2 focus:outline-none w-full"
                placeholder="Nhập địa chỉ"
              ></textarea>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
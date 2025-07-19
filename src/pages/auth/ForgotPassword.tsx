import { Link } from 'react-router-dom';
import { useForgotPassword } from '../../hooks/auth/useForgotPassword';

const ForgotPassword = () => {
  const { register, handleSubmit, errors, onSubmit } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] bg-cover">
      <div className="w-[1100px] h-[600px] bg-white rounded-[15px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row">
        {/* Left side */}
        <div className="flex-1 bg-gradient-to-tr from-[#5e72e4] to-[#825ee4] text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <h1 className="text-[2.5rem] mb-5 relative z-20 font-sans">BOOKSTORE</h1>
          <p className="mb-7 leading-relaxed text-[1.1rem] relative z-20 font-sans">
            Quên mật khẩu? Đừng lo lắng! Chúng tôi sẽ gửi mật khẩu mới đến email của bạn.
          </p>
          <div className="absolute bottom-[-50px] right-[-50px] w-[250px] h-[250px] bg-white/10 rounded-full"></div>
          <div className="absolute bottom-[-40px] right-[-40px] w-[200px] h-[200px] bg-white/10 rounded-full -top-[70px] -left-[70px]"></div>
        </div>

        {/* Right side */}
        <div className="flex-1 p-10 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Quên mật khẩu</h2>
          <p className="text-gray-600 mb-6">
            Nhập địa chỉ email của bạn và chúng tôi sẽ gửi mật khẩu mới cho bạn.
          </p>

          {/* Form */}
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                {...register('email', { 
                  required: 'Email không được để trống',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không hợp lệ'
                  }
                })}
                className={`w-full p-4 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-gradient-to-tr from-[#5e72e4] to-[#825ee4] text-white font-semibold shadow hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-300"
            >
              Gửi mật khẩu mới
            </button>

            <div className="text-center">
              <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
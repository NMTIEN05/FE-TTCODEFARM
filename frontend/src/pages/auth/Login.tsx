import { Link } from 'react-router-dom';
import { useLoginForm } from '../../hooks/auth/useLogin';

const Login = () => {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] bg-cover">
      <div className="w-[1100px] h-[800px] bg-white rounded-[15px] shadow-[0_15px_30px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row">
        {/* Left side */}
        <div className="flex-1 bg-gradient-to-tr from-[#5e72e4] to-[#825ee4] text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <h1 className="text-[2.5rem] mb-5 relative z-20 font-sans">BOOKSTORE</h1>
          <p className="mb-7 leading-relaxed text-[1.1rem] relative z-20 font-sans">
            Chào mừng bạn đến với cửa hàng Sách của chúng tôi. Đăng nhập hoặc đăng ký để trải nghiệm những sản phẩm chất lượng cao với mức giá hợp lý nhất!
          </p>
          <div className="absolute bottom-[-50px] right-[-50px] w-[250px] h-[250px] bg-white/10 rounded-full"></div>
          <div className="absolute bottom-[-40px] right-[-40px] w-[200px] h-[200px] bg-white/10 rounded-full -top-[70px] -left-[70px]"></div>
        </div>

        {/* Right side */}
        <div className="flex-1 p-10 flex flex-col ">
          {/* Tabs */}
          <div className="flex mb-7 border-b border-gray-200 space-x-6">
            <Link to="/auth/login" className="pb-3 font-semibold text-indigo-600 border-b-2 border-indigo-600">
              Đăng Nhập
            </Link>
            <Link to="/auth/register" className="pb-3 font-semibold text-gray-500 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition">
              Đăng Ký
            </Link>
          </div>

          {/* Form */}
          <form className=" flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
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

            <div>
              <label htmlFor="password" className="block mb-2 font-medium text-gray-700">Mật khẩu</label>
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                {...register('password', { 
                  required: 'Mật khẩu không được để trống',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự'
                  }
                })}
                className={`w-full p-4 border rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-gradient-to-tr from-[#5e72e4] to-[#825ee4] text-white font-semibold shadow hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-300"
            >
              Đăng Nhập
            </button>
          </form>

          {/* Social Login (nếu có) */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
};


export default Login;

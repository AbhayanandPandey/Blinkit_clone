import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaUser, FaLock, FaLockOpen } from 'react-icons/fa6';
import { MdAlternateEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import Api from '../config/Api';
import AxiosToastError from '../utils/AxiosToastError';

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength >= 4) return { level: 'Strong', color: 'green' };
  if (strength === 3) return { level: 'Medium', color: 'orange' };
  return { level: 'Weak', color: 'red' };
};

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const passwordsMatch = data.password === data.confirmPassword;
  const passwordStrength = getPasswordStrength(data.password);
  const isFormFilled = data.name && data.email && data.password && data.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormFilled) {
      toast.error("All fields are required");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await Axios({
        ...Api.register,
        data: data,
      });

      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/login');
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-600">
          Welcome to <span className="text-emerald-700">Blinkyt</span>
        </h2>
        <p className="text-center text-gray-500 mb-6">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
            <div className="flex items-center border border-gray-300 rounded px-3 bg-gray-50 focus-within:border-green-500">
              <FaUser className="text-gray-400 mr-2" />
              <input
                name="name"
                id="name"
                type="text"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full h-12 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded px-3 bg-gray-50 focus-within:border-green-500">
              <MdAlternateEmail className="text-gray-400 mr-2" />
              <input
                name="email"
                id="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-12 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <div className={`flex items-center border rounded px-3 bg-gray-50 ${data.password ? `border-${passwordStrength.color}-500` : 'border-gray-300'}`}>
              <FaLock className="text-gray-400 mr-2" />
              <input
                name="password"
                id="password"
                type={showPass ? 'text' : 'password'}
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 bg-transparent outline-none"
              />
              <span onClick={() => setShowPass(!showPass)} className="cursor-pointer px-2 text-gray-600">
                {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            {data.password && (
              <div className="mt-1">
                <div className="h-1 rounded-full"
                  style={{
                    backgroundColor: passwordStrength.color,
                    width:
                      passwordStrength.level === 'Weak'
                        ? '33%'
                        : passwordStrength.level === 'Medium'
                          ? '66%'
                          : '100%',
                  }}
                />
                <p className="text-sm mt-1" style={{ color: passwordStrength.color }}>
                  Password Strength: {passwordStrength.level}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">Confirm Password</label>
            <div className={`flex items-center border rounded px-3 bg-gray-50 ${
              data.confirmPassword
                ? passwordsMatch
                  ? 'border-green-500'
                  : 'border-red-500'
                : 'border-gray-300'
            }`}>
              <FaLockOpen className="text-gray-400 mr-2" />
              <input
                name="confirmPassword"
                id="confirmPassword"
                type={showPass1 ? 'text' : 'password'}
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full h-12 bg-transparent outline-none"
              />
              <span onClick={() => setShowPass1(!showPass1)} className="cursor-pointer px-2 text-gray-600">
                {showPass1 ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded transition duration-200 ${
              isFormFilled && !loading ? 'bg-green-600 hover:bg-green-700 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-sm text-gray-600">
          Already a user?{' '}
          <Link to="/login" className="text-green-700 hover:text-green-800">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
















// import React, { useState } from 'react'
// import { FaRegEyeSlash } from 'react-icons/fa6'
// import { FaRegEye } from 'react-icons/fa6'
// import { Link } from 'react-router-dom'
// const register = () => {
//     const [data, setData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     })
//     const [showPass, setShowPass] = useState(false)
//     const [showPass1, setShowPass1] = useState(false)
//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setData((prev) => {
//             return {
//                 ...prev,
//                 [name]: value
//             }
//         })
//     }
//     const validValue = Object.values(data).every(el=>el)
//     const handleSubmit =(e)=>{
//         e.preventDefault()
//     }
//     return (
//         <section className='container w-full mx-auto px-2'>
//             <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
//                 <p>welcome to Blinkyt</p>
//                 <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
//                     <div className='grid gap-1'>
//                         <label htmlFor="name">Name:</label>
//                         <input
//                             name='name'
//                             id='name'
//                             type="text"
//                             autoFocus
//                             className='bg-blue-50 p-2 border-2 rounded outline-none border-gray-300 focus-within:border-amber-400'
//                             value={data.name}
//                             placeholder='Enter your name'
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className='grid gap-1'>
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             name='email'
//                             id='email'
//                             type="email"
//                             className='bg-blue-50 p-2 border-2 rounded outline-none border-gray-300 focus-within:border-amber-400 '
//                             value={data.email}
//                             placeholder='Enyter your email'
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className='grid gap-1'>
//                         <label htmlFor="password">Password:</label>
//                         <div className='bg-blue-50 p-2 border-2 border-gray-300 rounded flex items-center focus-within:border-amber-400'>
//                             <input
//                                 name='password'
//                                 id='password'
//                                 type={showPass ? 'text' : 'password'}
//                                 className='w-full outline-none '
//                                 value={data.password}
//                                 placeholder='enter your password'
//                                 onChange={handleChange}
//                             />
//                             <div onClick={()=>{setShowPass(prev=>!prev)}}  className='cursor-pointer'>
//                                 {
//                                     showPass ? (<FaRegEye /> ):
//                                         (<FaRegEyeSlash />)

//                                 }
//                             </div>
//                         </div>
//                     </div>
//                     <div className='grid gap-1'>
//                         <label htmlFor="confirmPassword">Confirm Password:</label>
//                         <div className='bg-blue-50 p-2 border-2 border-gray-300 rounded flex items-center focus-within:border-amber-400'>
//                             <input
//                                 name='confirmPassword'
//                                 id='confirmPassword'
//                                 type={showPass1 ? 'text' : 'password'}
//                                 className='w-full outline-none '
//                                 value={data.confirmPassword}
//                                 placeholder='enter your confirm password'
//                                 onChange={handleChange}
//                             />
//                             <div onClick={()=>{setShowPass1(prev=>!prev)}}  className='cursor-pointer'>
//                                 {
//                                     showPass1 ? (<FaRegEye /> ):
//                                         (<FaRegEyeSlash />)

//                                 }
//                             </div>
//                         </div>
//                     </div>
//                     <button className={` ${validValue ? 'bg-green-600 hover:bg-green-700':'bg-gray-500'}  text-white rounded font-semibold py-2 cursor-pointer my-3 tracking-wide`}>Register</button>
//                 </form>
//                 <div className='flex justify-between mt-2'>
//                     <div>
//                         <Link to="/forgot-password" > forgot password</Link>
//                     </div>
//                     <div>
//                         <Link to="/forgot-password" > already user? login</Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default register

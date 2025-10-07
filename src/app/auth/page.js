'use client'

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, HeartPulse, Stethoscope, Syringe } from 'lucide-react';
import endpointroute from '../utils/endpointroute';
export default function LoginPage() {

  return (
    <div className=" min-h-screen flex items-center justify-center  bg-gray-100 px-4 py-10 overflow-hidden md:mt-20">
      {/* Decorative Icons */}
      <Stethoscope className="absolute top-6 left-6 text-[#207dff] opacity-20 w-10 h-10 sm:w-14 sm:h-14" />
      <HeartPulse className="absolute bottom-10 right-6 text-red-500 opacity-20 w-10 h-10 sm:w-14 sm:h-14" />
      <Syringe className="absolute top-1/3 right-10 text-green-500 opacity-20 w-10 h-10 sm:w-14 sm:h-14" />

      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome to Mediplus</h2>
        <p className="text-sm text-center text-gray-500 mb-4">Login to  with any of the provided accounts </p>

        {/* Demo Credentials */}
        {/* Demo Credentials Combined */}
<div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-md text-sm space-y-3">
  <p className="font-semibold text-base">Demo Credentials</p>

  <div>
    <p className="font-medium"> Admin</p>
    <p>Username: <span className="font-semibold">admin</span></p>
    <p>Password: <span className="font-semibold">admin</span></p>
  </div>

  <div className="pt-2 border-t border-blue-100">
    <p className="font-medium"> User</p>
    <p>Username: <span className="font-semibold">quwam</span></p>
    <p>Password: <span className="font-semibold">123456</span></p>
  </div>
</div>


        <LoginForm />
       <ToastContainer
  position="top-right"
  marginTop="50px"
  toastContainerStyle={{
    marginTop: '80px', 
    zIndex: 9999 
  }}
/>

      </div>
    </div>
  );
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, lodingLogin, username, password , setUserName, setPassWord } = useAuth();
// const checkAuth = async () => {
//         try {
//           // setLoading(true);
//           const response = await endpointroute.get("/auth/status", {
//             withCredentials: true
//             // withCredentials: true,
//           });

//           const loggedinUser = response.data.user;
//           // setUser(loggedinUser);
//           console.log(loggedinUser)

//           if (!loggedinUser || (allowedRoles.length && !allowedRoles.includes(loggedinUser.role))) {
//             console.log("Unauthorized access");
//             // router.push("/auth");
//           }
//           // setLoading(false)

//         } catch (error) {
//           console.log(error?.response?.data?.message || "Authentication failed");
//           console.log('error',error)
//           // router.push("/auth");
//         } finally {
//           console.log('hello world')
//         }
//       };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {/* <button onClick={checkAuth}>hello</button> */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Username</label>
        <input
          type="text"
          value={username}
          onChange={((e)=>{
            setUserName(e.target.value)
          })}
          // readOnly
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#207dff] focus:border-[#207dff]"
        />
      </div>

      <div className="relative">
        <label className="text-sm text-gray-600 mb-1 block">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
           onChange={((e)=>{
            setPassWord(e.target.value)
          })}
          // readOnly
          className="w-full px-4 py-2 rounded-lg border border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-[#207dff] focus:border-[#207dff]"
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button
        type="submit"
        disabled={lodingLogin}
        className={`w-full bg-[#207dff] text-white py-3 rounded-lg font-medium hover:bg-[#1a6bd9] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#207dff] ${
          lodingLogin ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {lodingLogin ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Logging in...
          </span>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}

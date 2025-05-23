'use client'
import { useState } from "react";
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  return (
    <div className="min-h-screen border-t bg-gray-50 flex items-center justify-center container py-10 mt-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#207dff] mb-2">Mediplus</h1>
          <p className="text-gray-600">Login to access medical dashboard</p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
            <p>Demo credentials:</p>
            <p className="font-medium">Username: <span className="text-[#207dff]">admin</span></p>
            <p className="font-medium">Password: <span className="text-[#207dff]">admin</span></p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#207dff] py-4 px-6">
            <h2 className="text-xl font-semibold text-white">Login to Dashboard</h2>
          </div>
          
          <div className="p-6 sm:p-8">
            <LoginForm />
          </div>
        </div>
        
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

function LoginForm() {
 
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin,lodingLogin,username,password } = useAuth();

 

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          value={username}
          readOnly
          // onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-[#207dff] outline-none transition"
          placeholder="Enter your username"
          required
        />
      </div>
      
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          readOnly
          // onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-[#207dff] outline-none transition pr-10"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      
      <button
        type="submit"
        disabled={lodingLogin}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-[#207dff] hover:bg-[#1a6bd9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#207dff] transition ${lodingLogin ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {lodingLogin ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </span>
        ) : 'Login'}
      </button>
      
    
    </form>
  );
}
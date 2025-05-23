

'use client'
import withAuth from '../hoc/withAuth'
import { usePathname } from 'next/navigation';
import {Admin_Routes} from './config/adminroutes'
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const pathname = usePathname();

const {user}=useAuth()
    return (
     <main>
  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 w-full px-4 py-2 bg-[#207dff] ">
  {/* Left: Admin Portal */}
  <h3 className="text-white font-medium text-center md:text-left">Admin Portal</h3>

  {/* Center: Welcome Message */}
  <p className="text-center text-white font-medium">
    Medicare welcomes you,{" "}
    <span className="font-semibold">
      {user.username.charAt(0).toUpperCase()}
      {user.username.slice(1).toLowerCase()}
    </span>
  </p>

  {/* Right: Username + Cool Phrase */}
  <p className="text-right hidden md:block text-white font-semibold">
    {user.username.charAt(0).toUpperCase()}
    {user.username.slice(1).toLowerCase()} ⚡
  </p>
</div>


       <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      
     {mobileOpen?  <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed z-20 top-4 right-4 p-2 rounded-lg bg-[#207dff] text-white"
      >✖</button>: <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="md:hidden fixed z-20 top-4 right-4 p-2 rounded-lg bg-[#207dff] text-white"
    >
      ☰
    </button>}

      {/* Sidebar */}
      <aside
  className={`
    bg-[#207dff] border text-white fixed md:relative z-10 h-full
    transition-all duration-300
    ${isCollapsed ? 'w-20' : 'w-64'}
    ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `}
>
  <div className="p-4 flex items-center justify-between border-b border-white/20 h-16">
    {!isCollapsed &&<Link href={`/admin`}> <h1 className="text-xl font-bold" onClick={() => setMobileOpen(!mobileOpen)} >Mediplus</h1></Link>}
    <button
      onClick={() => setIsCollapsed(!isCollapsed)}
      className="p-2 rounded-full hover:bg-white/10 hidden md:block"
    >
      {isCollapsed ? '»' : '«'}
    </button>
  </div>

  <div className="p-4 h-[calc(100%-4rem)] flex flex-col">
    <nav className="flex-1 overflow-y-auto">
      <ul className="space-y-1">
        {Admin_Routes.map((route) => (
          <li key={route.path}>
            <a
              href={route.path}
              className={`
                flex items-center p-3 rounded-lg transition-colors
                ${pathname === route.path ? 'bg-white/20' : 'hover:bg-white/10'}
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <span className={`${isCollapsed ? '' : 'mr-3'}`}>
                {route.icon}
              </span>
              {!isCollapsed && route.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    {/* Logout Button - Added at the bottom */}
    <button
      onClick={() => { /* Add your logout logic here */ }}
      className={`
        mt-auto flex items-center p-3 rounded-lg transition-colors
        bg-red-500 hover:bg-red-600 text-white
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      <svg 
        className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      {!isCollapsed && "Logout"}
    </button>
  </div>
</aside>

      {/* Main Content */}
      <main className="flex-1  overflow-auto my-15 md:transition-all duration-300 sm:my-0 xl:overflow-visible">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
     </main>
    );
  };
  
export default withAuth(AdminLayout,['admin'])











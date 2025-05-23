

'use client'
import withAuth from '../hoc/withAuth'
import { usePathname } from 'next/navigation';
import {User_Routes} from './config/userroutes'
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const UserLayout= ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const pathname = usePathname();

const {user}=useAuth()
    return (
     <main className='min-h-screen'>

  <div className="w-full px-4 py-3 bg-[#207dff]">
  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
    {/* Left: Patient Portal */}
    <h3 className="text-white text-lg font-semibold text-center md:text-left">
      Patient Portal
    </h3>

    {/* Center: Welcome Message */}
    <p className="text-white text-center text-base md:text-lg font-medium">
      Medicare welcomes you,&nbsp;
      <span className="font-semibold capitalize">
        {user.username}
      </span>
    </p>

    {/* Right: Username with Icon */}
    <Link href={'/user/profile'}>
    <div className="hidden md:flex items-center justify-end gap-2 text-white font-semibold">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v3h16v-3c0-2.667-5.333-4-8-4z" />
      </svg>
    </div></Link>
  </div>
</div>

{mobileOpen&& <div
    className="fixed inset-0 bg-black bg-opacity-50 z-30"
  />}


       <div className="flex  bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      
     <div>
     {mobileOpen?  <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed z-20 top-4 right-4 p-2 z-40 rounded-lg bg-[#207dff] text-white"
      >✖</button>: <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="md:hidden fixed z-20 top-4 right-4 p-2 rounded-lg bg-[#207dff] text-white"
    >
      ☰
    </button>}

      {/* Sidebar */}
     <aside
  className={`
    bg-[#207dff] border text-white fixed top-0 md:relative h-screen
    transition-all duration-300
    ${isCollapsed ? 'w-20' : 'w-64'}
    ${mobileOpen ? 'translate-x-0 z-40' : '-translate-x-full md:translate-x-0'}
  `}
>
  <div className="p-4 flex items-center justify-between border-b border-white/20 h-16">
    {!isCollapsed &&<Link href={`/user`}> <h1 className="text-xl font-bold" onClick={() => setMobileOpen(!mobileOpen)} >Mediplus</h1></Link>}
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
        {User_Routes.map((route) => (
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
     </div>

      {/* Main Content */}
    <main className="w-full overflow-auto   my-15 md:transition-all duration-300 sm:my-0 xl:overflow-visible">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
     </main>
    );
  };
  
export default withAuth(UserLayout,['user'])












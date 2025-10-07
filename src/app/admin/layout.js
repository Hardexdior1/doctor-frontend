

'use client'
import withAuth from '../hoc/withAuth'
import { usePathname } from 'next/navigation';
import {Admin_Routes} from './config/adminroutes'
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
// import { useParams } from 'next/navigation';
const AdminLayout = ({ children }) => {



  const [isCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const pathname = usePathname();
const showBackToDashboard = pathname !== "/admin"
const {user,handleLogout,loadingLogOut,showLogOut,setShowLogout}=useAuth()
    return (
     <main>

       {showLogOut&&  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4">Are you sure you want to logout?</h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={(()=>{
              setShowLogout(false)
            })}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            No
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            { loadingLogOut?"Loggin Out..":"Yes"}
            
          </button>
        </div>
      </div>
    </div>}
  <div className='relative'>
    <div className="grid  fixe left-0 right-0 grid-cols-1 md:grid-cols-3 items-center gap-2 w-full px-4 py-2 bg-blue-700">
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
    {user.username.slice(1).toLowerCase()} 
  </p>
</div>
  </div>


       <div className="flex h-screen  bg-gray-50">
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
                  <div className={`hidden md:block h-[100vh] ${isCollapsed ? 'w-20' : 'w-64'}`}></div>

     <aside
  className={`
    bg-blue-700
      overflow-x-y-scroll text-white fixed  h-full left-0 top-0
    transition-all duration-300 z-30
    ${isCollapsed ? 'w-20' : 'w-64'}
    ${mobileOpen ? 'translate-y-0 z-30 ' : '-translate-y-full z-30 md:translate-y-0'}
  `}
>
  <div className="p-4 flex items-center justify-between border-b border-white/20 h-16">
    {!isCollapsed &&<Link href={`/admin`}> <h1 className="text-xl font-bold" onClick={() => setMobileOpen(!mobileOpen)} >Mediplus</h1></Link>}
   
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
      className={`
        mt-auto flex items-center p-3 rounded-lg transition-colors
        bg-red-500 hover:bg-red-600 text-white
        ${isCollapsed ? 'justify-center' : ''}
      `}
       onClick={(()=>{
              setShowLogout(true)
            })}
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
      <main className="flex-1  overflow-auto md:transition-all duration-300 sm:my-0 xl:overflow-visible">
        <div className="p-6">
          <div className="flex justify-between items-center gap-2 mb-8">
       

       {showBackToDashboard&& <div> <Link href="/admin">
  <button className="px-3 py-2 bg-[#207dff] text-white rounded-md">
    ← Back to Dashboard
  </button>
</Link></div>}
      

 


      </div>
          {children}
        </div>
      </main>
    </div>
     </main>
    );
  };
  
export default withAuth(AdminLayout,['admin'])











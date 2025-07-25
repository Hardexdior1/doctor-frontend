
'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
const NavBar = () => {

  const {user}=useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
const pathname=usePathname()
console.log('pathname',pathname)
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hotel-specific navigation items
  const navItems = [
    { name: "Home", href: "/", id: "home" },
    { name: "About", href: "/about", id: "about" },
    // { name: "Department", href: "/#deparment", id: "department" },
    { name: "Doctors", href: "/doctors", id: "doctors" },
    { name: "Blogs", href: "/blogs", id: "blogs" },
    { name: "Contact", href: "/contact", id: "contact" },
    { name: user?'my account':'login', href: "/auth", id: "auth" },

  ];
  const shouldShowBorder = 
  pathname === '/auth' || 
  (pathname !== '/' && pathname.split('/').length === 2 && pathname.startsWith('/'))
  console.log(user)
  return (
  
  <main>
    
      <header className={`${pathname=='/auth'?`z-40`:`z-40`} ${pathname.includes('doctors')?`border-b`:``} ${isScrolled?'border-b':''} ${shouldShowBorder?'border-b':""} fixed backdrop-blur top-0 right-0 left-0  bg-white  bg-opacity-30 w-full transition-all py-5 duration-300 bg-opacity-85 bg-white  lg:container `}>
      {/* Desktop Navigation */}
      <nav className="container px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
         <h3 className="font-bold">Mediplus</h3>
        </Link>
     
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
             
                 <Link
  href={item.href}
  className={`font-bold transition-colors ${
  pathname === item.href||pathname.startsWith(item.href+'/') ? "text-[#207dff] border-b-2 border-b-[#207dff]" : "text-black hover:text-[#207dff]"
  }`}
>
  {item.name}

  
</Link>


              </li>
            ))}
          </ul>

         
        </div>

      
 <Link
              href="#appointment"
              className="hidden md:block"
            >
        <button               className="bg-[#207dff] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#186fdd] transition"
>
         
              Make Appointment
           
        </button>
         </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed h-screen  bg-white inset-0  z-40 transform transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="container mx-auto px-4   py-6">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <h3 className="font-bold">Mediplus</h3>

            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`block py-2 text-lg ${item.name=='login'?'hidden':''}  ${  pathname === item.href||pathname.startsWith(item.href+'/') ? "text-[#207dff] border-b-2 border-b-[#207dff]" : "text-gray-700"
}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10  space-y-4 flex flex-col gap-4">
            <Link href="/auth">
              <button 
                className="w-full py-3 border border-[#207dff] text-[#207dff] rounded-lg font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In n
              </button>
            </Link>


             <Link
              href="#appointment"
              // className=" md:hidden"
            >
        <button               className="bg-[#207dff] rounded-lg w-full text-white  py-3 font-semibold hover:bg-[#186fdd] transition"
>
         
              Make Appointment
           
        </button>
         </Link>
           
          </div>
        </div>
      </div>



    </header>
  </main>
  );
};

export default NavBar;
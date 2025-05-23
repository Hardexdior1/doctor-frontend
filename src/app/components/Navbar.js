
'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
const NavBar = () => {

  const {user}=useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
const pathname=usePathname()

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
    { name: "About", href: "#whoweare", id: "whoweare" },
    { name: "Department", href: "#deparment", id: "department" },
    { name: "Doctors", href: "/doctors", id: "doctors" },
    { name: "Blogs", href: "#about", id: "about" },
    { name: "Contact", href: "#contact", id: "contact" },
    { name: "appointment", href: "#appointment", id: "appointment" },

  ];
  const shouldShowBorder = 
  pathname === '/auth' || 
  (pathname !== '/' && pathname.split('/').length === 2 && pathname.startsWith('/'))
  console.log(user)
  return (
  
  <main>
    <div className="text-white  container bg-[#207dff] hidden md:block">
    <div className="font-semibold flex items-center  z-20 justify-between">
    <p className="text-white text-sm">+2349 13111 4346</p>
      <p className="text-white text-sm hidden md:block">adeniranquwam001@gmail.com</p>
      
      {user?  <Link href={`/dasboard`}>Dashboard</Link> :<Link href={`/auth`}>login</Link>}
    
    </div>


    </div>
      <header className={`absolute ${shouldShowBorder?'border-b':""}  top-0 right-0 left-0 z-10 bg-white md:top-6 bg-opacity-30 w-full transition-all py-5 duration-300 lg:container ${isScrolled ? "bg-white bg-opacity-30" : "bg-white bg-opacity-85"}`}>
      {/* Desktop Navigation */}
      <nav className="container px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={(()=>{
          setActiveLink("home")
        })}>
         <h3 className="font-bold">Mediplus</h3>
        </Link>
     
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
          href={item.href}
          className={`font-medium transition-colors ${
            activeLink === item.id ? "text-[#207dff]" : "text-black hover:text-[#207dff]"
          }`}
          onClick={() => setActiveLink(item.id)}
        >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

         
        </div>

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
      <div className={`md:hidden fixed inset-0 bg-white z-40 transform transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="container mx-auto px-4 py-6">
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
                  className={`block py-2 text-lg ${activeLink === item.id ? "text-[#207dff] font-medium" : "text-gray-700"}`}
                  onClick={() => {
                    setActiveLink(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-4 flex flex-col gap-4">
            <Link href="/auth">
              <button 
                className="w-full py-3 border border-[#207dff] text-[#207dff] rounded-lg font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </button>
            </Link>
            <Link href="/auth/register">
              <button 
                className="w-full py-3 bg-[#207dff] text-white rounded-lg font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
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
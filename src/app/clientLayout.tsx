// app/ClientLayout.tsx (CLIENT COMPONENT)
'use client';
import { usePathname } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ROLES_ROUTES } from './config/routes';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
console.log(user)
  // Check if the current path is one of the routes that should be hidden
  // const shouldHide =  Object.values(ROLES_ROUTES).some(path => pathname.startsWith(path)) || !!user;
  const shouldHide = Object.values(ROLES_ROUTES).some(path => pathname.startsWith(path));


  return (
    <>
      {!shouldHide && <Navbar />}
      <main>{children}</main>
      {!shouldHide && <Footer />}

      {/* {!shouldHide && <Footer />} */}
    </>
  );
}
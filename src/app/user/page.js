

import Link from "next/link";
import PastAppointmentTables from './components/PastAppointmentsTable'
const Page=()=>{
 
    const User_Routes = [
     
      {
        path: "/user/book-appointment",
        label: "Book Appointment",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        path: "/user/appointments",
        label: "My Appointments",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      
      {
        path: "/user/profile",
        label: "Profile",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v3h16v-3c0-2.667-5.333-4-8-4z" />
          </svg>
        )
      },
     
         ];
  return  <div className="grid grid-cols gap-10">
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
  {User_Routes.map((route) => (
    <Link
      key={route.path}
      href={route.path}
      className="group flex flex-col items-center justify-center p-6 rounded-2xl shadow-md bg-white border border-blue-100 hover:bg-[#207dff] hover:shadow-lg transition-all duration-200"
    >
      <div className="p-3 rounded-full bg-[#207dff]/10 group-hover:bg-white transition-all duration-200">
        <div className="text-[#207dff] group-hover:text-[#207dff]">{route.icon}</div>
      </div>
      <span className="mt-3 text-sm font-medium text-gray-800 group-hover:text-white transition-all duration-200">
        {route.label}
      </span>
    </Link>
  ))}
</div>

<PastAppointmentTables />


   </div>
}

    
export default Page
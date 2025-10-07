'use client'

import { useState, useEffect } from 'react'
import endpointroute from '@/app/utils/endpointroute'
import Image from 'next/image';


const Doctors = () => {
  const [activeTab, setActiveTab] = useState('coming')
  const [pastAppointments, setPastAppointments] = useState([])
  const [isLoading,setIsLoading]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true)

      try {
        const res = await endpointroute.get("/user-past-appointment")
        setPastAppointments(res.data)
        setIsLoading(false)

      } catch (error) {
        console.log("Failed to fetch data:", error)
        setIsLoading(false)

      }
    }
    fetchData()
  }, [])


  const comingAppointments=pastAppointments?.filter(
    (item) => new Date(item.date) > new Date()||new Date(item.date).toDateString()== new Date().toDateString()
  );
  console.log('coming appintments',comingAppointments)
  const past=pastAppointments?.filter(
   
    (item) => {
       
      return  new Date(item.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    }
  );

  const appointmentStatus = (date) => {
    const now = new Date();
    const appointmentStart = new Date(date);
    const appointmentEnd = new Date(appointmentStart.getTime() + 60 * 60 * 1000); // 1 hour later
  
    if (appointmentEnd < now) {
      return (
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
          Past Appointment
        </button>
      );
    }
  
    const isSameDay =
      appointmentStart.getFullYear() === now.getFullYear() &&
      appointmentStart.getMonth() === now.getMonth() &&
      appointmentStart.getDate() === now.getDate();
  
    if (isSameDay) {
      if (now >= appointmentStart && now <= appointmentEnd) {
        return (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Ongoing Now
          </button>
        );
      }
  
      return (
        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg">
          Today&lsquo;s Appointment
        </button>
      );
    }
  
    return (
      <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg">
        Upcoming Appointment
      </button>
    );
  };
  

const formartDocName=(doctorName)=>{
  let doctor=doctorName.trim().split(' ')[1]||[0]
let formattedName = doctor.toLowerCase().startsWith("dr")
  ? doctor.charAt(0).toUpperCase() + doctor.slice(1)
  : "Dr. " + doctor.charAt(0).toUpperCase() + doctor.slice(1);
  return formattedName
}
  return (
    <div className="bg-white">
    

      <div className="flex border-b border-gray-200 mb-4 justify-between md:justify-start">

         <button
          onClick={() => setActiveTab('coming')}
          className={`py-2 font-semibold text-sm border-b-2 transition-all md:px-4 ${
            activeTab === 'coming'
              ? 'border-[#207dff] text-[#207dff]'
              : 'border-transparent text-gray-500 hover:text-[#207dff]'
          }`}
        >
          Coming Appointments
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`py-2 font-semibold text-sm border-b-2 transition-all md:px-4 ${
            activeTab === 'past'
              ? 'border-[#207dff] text-[#207dff]'
              : 'border-transparent text-gray-500 hover:text-[#207dff]'
          }`}
        >
          Past Appointments
        </button>
       
      </div>

      <div className="transition">
  {isLoading ? (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col animate-pulse border border-gray-200 rounded-lg text-center"
        >
          <div className="w-full h-[200px] bg-gray-300 rounded-t-lg" />
          <div className="flex flex-col gap-2 py-2 px-2">
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-1" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="mt-4 w-1/2 h-10 mx-auto bg-gray-300 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <>
      {activeTab === "past" && (
      past.length==0? <div className="text-center py-20 text-gray-500">
      <p className="text-3xl mb-2">📁</p>
      <p className="text-lg font-medium">No past appointments found.</p>
    </div>:  <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {past.filter((doc) => doc?.doctorId)?.map((doc, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-200 rounded-lg shadow-sm overflow-hidden text-center"
            >
              <Image
                src={doc.doctorId.image}
                alt={doc.doctorId.name}
                width={1000}
                height={600}
                className="rounded-t-lg object-cover w-full"
              />
              <div className="flex flex-col gap-1 py-3 px-4 text-left">
                <h3 className="text-lg font-bold">      
                  {formartDocName(doc.doctorId.name)}                             
</h3>
                <p className="text-sm text-[#207dff] font-medium">
                  {doc.doctorId.specialty}
                
                </p>
                <p className="text-gray-500 text-sm italic">
                  {doc.diagnosis}
                </p>

              <div className="flex text-sm text-gray-700 mt-2">
                  <span className="font-medium">Date:</span>
                  <span>
                    {new Date(doc.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>{" "}
                  -{" "}
                  <span>
                    {new Date(doc.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>

               

                <div className="mt-3 text-base">
                  {appointmentStatus(doc.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


       {activeTab === "coming" && (
      comingAppointments?.length==0?<div className="text-center py-20 text-gray-500">
      <p className="text-3xl mb-2">📅</p>
      <p className="text-lg font-medium">No upcoming appointments.</p>
    </div>:  <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {comingAppointments.filter((doc) => doc?.doctorId)?.map((doc, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-200 rounded-lg shadow-sm overflow-hidden text-center"
            >
              <Image
                src={doc.doctorId.image}
                alt={doc.doctorId.name}
                width={1000}
                height={600}
                className="rounded-t-lg object-cover w-full"
              />
              <div className="flex flex-col gap-1 py-3 px-4 text-left">
                <h3 className="text-lg font-bold">   
                                {/* {doc.doctorId.name.charAt(0).toUpperCase() + doc.doctorId.name.slice(1)} */}

                                {formartDocName(doc.doctorId.name)}
</h3>

                <p className="text-sm text-[#207dff] font-medium">
                  {doc.doctorId.specialty}
                </p>
                <p className="text-gray-500 text-sm italic">
                  {doc.diagnosis }
                </p>

                <div className="flex text-sm text-gray-700 mt-2">
                  <span className="font-medium">Date:</span>
                  <span>
                    {new Date(doc.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>{" "}
                  -{" "}
                  <span>
                    {new Date(doc.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>

              

                <div className="mt-3 text-base">
                  {appointmentStatus(doc.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )} 
    </>
  )}
</div>

    </div>
  )
}

export default Doctors

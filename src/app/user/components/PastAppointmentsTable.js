'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import endpointroute from '@/app/utils/endpointroute';

const RecentAppointmentsCards = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await endpointroute.get('/user-past-appointment');
        setAppointments(res.data.slice(0, 3)); // Show only latest 3
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const appointmentStatus = (date) => {
    const now = new Date();
    const start = new Date(date);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    if (end < now) {
      return (
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
          Past Appointment
        </span>
      );
    }

    const isToday =
      start.getFullYear() === now.getFullYear() &&
      start.getMonth() === now.getMonth() &&
      start.getDate() === now.getDate();

    if (isToday && now >= start && now <= end) {
      return (
        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
          Ongoing Now
        </span>
      );
    }

    return (
      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
        Upcoming Appointment
      </span>
    );
  };

  return (
    <div className="w-full">
      {/* Title & Link */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Appointments</h2>
        <Link
          href="/user/appointments"
          className="text-sm text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Appointments */}
      {isLoading ? (
        <p className="text-center py-8 text-gray-500 font-medium">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center py-8 text-gray-500 font-medium">
          No recent appointments.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {appointments.map((appt, index) => {
            const doc = appt.doctorId;
            return (
              <div
                key={appt._id || index}
                className="border rounded-lg shadow-sm overflow-hidden bg-white"
              >
                {/* Image - FIXED to show full face */}
                {doc ? (
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    width={500}
                    height={300}
                    className="w-full  object-cover object-top max-h-60"
                  />
                ) : (
                  <div className="h-44 bg-gray-100 flex items-center justify-center text-sm text-gray-400 italic">
                    Doctor image not available
                  </div>
                )}

                <div className="p-4 space-y-1">
                  {/* <h3 className="text-lg font-bold">{doc ? doc.name : 'Doctor Unavailable'}</h3>
                  <p className="text-sm text-[#207dff]">{doc?.specialty || 'N/A'}</p> */}
{/*                    
{doc.name? <div> <h3 className="text-xl font-bold"> {doc.name.toUpperCase().startsWith('dr'.toUpperCase())?`${doc.name.charAt(0).toUpperCase() + doc.name.slice(1)}`:`Dr. ${doc.name.charAt(0).toUpperCase() + doc.name.slice(1)}` } </h3> 
        
                    <h4 className="text-[#207dff]">                {doc?.specialty.charAt(0).toUpperCase() + doc?.specialty.slice(1)
                     }  
                      
</h4> </div>:''} */}
                   {doc?.name ? (
  <div>
    <h3 className="text-xl font-bold">
      {doc.name.toUpperCase().startsWith("DR")
        ? doc.name.charAt(0).toUpperCase() + doc.name.slice(1)
        : `Dr. ${doc.name.charAt(0).toUpperCase() + doc.name.slice(1)}`}
    </h3>
    <h4 className="text-[#207dff]">
      {doc.specialty?.charAt(0).toUpperCase() + doc.specialty?.slice(1)}
    </h4>
  </div>
) : (
  <div>
    <h3 className="text-xl font-bold text-gray-400 italic">Doctor unavailable</h3>
  </div>
)}



                  <p className="text-gray-500 text-sm italic">
                    {appt.diagnosis  || 'No message provided'}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(appt.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <div className="mt-2">{appointmentStatus(appt.date)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentAppointmentsCards;

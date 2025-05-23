'use client'
import { useEffect, useState } from "react";
import endpointroute from "../utils/endpointroute";
const Page = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState([]);


  const [loading,setLoading]=useState(false)

  useEffect(() => {
    // Fetch all doctors
    setLoading(true)
    const fetchDoctors = async () => {
      try {
        const response = await endpointroute.get("/all-doctors");
        setDoctors(response.data);
        console.log(response)
      } catch (error) {
        console.log("Error fetching doctors:", error);
      }
    };

    // Fetch all appointments
    const fetchAppointments = async () => {
      
      try {
        const response = await endpointroute.get("/all-appointment");
        setAppointments(response.data);
        setLoading(false)
      } catch (error) {
        console.log("Error fetching appointments:", error);
        setLoading(false)
      }
    };
    // fetch all reviews
    
    const fetchReviews = async () => {
      try {
        const response = await endpointroute.get("/reviews");
        setReviews(response.data.reviews);
        // console.log(response.data)

      } catch (error) {
        console.log("Error fetching appointments:", error);
      }
    };

    fetchDoctors();
    fetchAppointments();
    fetchReviews()
  }, []);

  const [searchTerm,setSearchTerm]=useState('')
 
  const overviewStats = [
    {
      title: "Total Doctors",
      count: doctors.length,
    },
    {
      title: "Total Appointments",
      count: appointments.length,
    },
    {
      title: "Total Reviews",
      count: reviews.length,
    },
  ];

  const filteredAppoinments = appointments.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  

  const getStatusButton = (appointmentDate) => {
    const today = new Date();
    const appointmentDateObj = new Date(appointmentDate);
    
    if (appointmentDateObj < today) {
      return (
        <button className="bg-gray-400 text-white px-4 py-2 rounded-lg">
          Past Appointment
        </button>
      );
    } else if (appointmentDateObj.toDateString() === today.toDateString()) {
      return (
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
          Today&apos;s Appointment
        </button>
      );
    } else {
      return (
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Upcoming Appointment
        </button>
      );
    }
  };

   const itemsPerPage=6
  
    const [currentPage,setCurrentPage]=useState(1)
  
    const startIndex=(currentPage-1)*itemsPerPage
  
    const lastIndex=startIndex+itemsPerPage
  
    const appointmentLists=filteredAppoinments.slice(startIndex,lastIndex)
  
    const total=Math.min(lastIndex,appointments.length)
   
  return (
    <main className=" md:py-0">
    

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
  {overviewStats.map((stat, index) => (
    <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
      <h4 className="text-xl text-[#207dff] font-semibold">{stat.title}</h4>
      <p className="text-gray-700">{stat.count}</p>
    </div>
  ))}
</div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
    <h3 className="text-xl font-semibold text-[#207dff]">Appointments</h3>
    
    <input
      type="search"
      placeholder="Search patients by name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-[#207dff] text-black placeholder-[#207dff] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#207dff] w-full md:w-64"
    />
  </div>


<div className="bg-white  runded-lg">
<div className="overflow-x-auto">
  <table className="w-full text-left border-collapse">
  <thead className="bg-blue-50">
  <tr>
    <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[150px]">
      Patient Name
    </th>
    <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[200px]">
      Diagnosis
    </th>
    <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[150px]">
      Doctor
    </th>
    <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[180px]">
      Date
    </th>
    <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[120px]">
      Status
    </th>
  </tr>
</thead>

    <tbody>

    {loading&&  <tr>
    <td colSpan="6" className="text-center font-bold text-gray-500 py-6">
      Loading...
    </td>
  </tr>}
      {filteredAppoinments.length ==0&&searchTerm.trim()!==""?(
       <tr>
       <td colSpan="5" className="text-center text-gray-500 py-4">
         No patient appointment found with the name &quot;{searchTerm}&quot;
       </td>
     </tr>
      ) : (
        

        appointmentLists.map((appointment) => {
  const doctor = doctors.find(doc => doc._id === appointment.doctorId);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(appointment.date));

  return (
    <tr key={appointment._id}  className="border-t hover:bg-blue-50 transition-all">
      <td className="px-4 py-2">    {appointment.name.charAt(0).toUpperCase()}
      {appointment.name.slice(1).toLowerCase()} </td>
      <td className="px-4 py-2">{appointment.diagnosis}</td>
      <td className="px-4 py-2">{doctor ? doctor.name : "Unknown"}</td>
      <td className="px-4 py-2">{formattedDate}</td>
      <td className="px-4 py-2">
        {getStatusButton(appointment.date)}
      </td>
    </tr>
  );
})
      )}
    </tbody>
  </table>
</div>
</div>

</div>



<div className="flex flex-col items-center justify-center gap-5 mb-5 py-5 md:flex-row">
  <button
    onClick={() => {
      setCurrentPage(currentPage - 1);
    }}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      currentPage === 1
        ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
        : 'bg-white text-[#207dff] border border-[#207dff] hover:bg-[#207dff] hover:text-white'
    }`}
  >
    Prev
  </button>

  <h2 className="text-lg font-semibold text-gray-700">
    {`Showing ${total} of ${appointments.length} appointments`}

  </h2>
  <button
    onClick={() => {
      setCurrentPage(currentPage + 1);
    }}
    disabled={total === appointments.length}
    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      total === appointments.length
        ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
        : 'bg-white text-[#207dff] border border-[#207dff] hover:bg-[#207dff] hover:text-white'
    }`}
  >
    Next
  </button>
</div>


    </main>
  );
};

export default Page;

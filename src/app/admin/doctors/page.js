
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import endpointroute from '../../utils/endpointroute'
import Modal from "./EditDoctorModal/Modal";
export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true)
      try {
        const res = await endpointroute.get("/all-doctors");
        setDoctors(res.data);
      } catch (error) {
        console.log("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  // doctor modal
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorEdit, setDoctorEdit] = useState(null);
  const handleEditDoctor = (doctor) => {
    setDoctorEdit(doctor);
    console.log(doctor);
  }

  const itemsPerPage=6
  
  const [currentPage,setCurrentPage]=useState(1)

  const startIndex=(currentPage-1)*itemsPerPage

  const lastIndex=startIndex+itemsPerPage

  const doctorList=filteredDoctors.slice(startIndex,lastIndex)

  const total=Math.min(lastIndex,doctors.length)

  return (
    <div >
      {/* modal */}
{isModalOpen &&       <Modal handleToggleModal={handleToggleModal} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} doctor={doctorEdit}/>
}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h3 className="text-xl font-semibold text-[#207dff]">Doctors</h3>

        <input
          type="search"
          placeholder="Search doctor by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-[#207dff] text-black placeholder-[#207dff] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#207dff] w-full md:w-64"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[80px]">Image</th>
                <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[150px]">Name</th>
                <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[150px]">Specialty</th>
                <th className="px-4 py-4 text-gray-700 text-sm font-semibold border-b font-medium whitespace-nowrap min-w-[200px]">Contact</th>
                <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[120px]">Status</th>
                <th className="px-4 py-4 text-sm font-semibold text-gray-700 border-b font-medium whitespace-nowrap min-w-[100px]">Actions</th>
              </tr>
            </thead>

<tbody>
{loading&&  <tr>
    <td colSpan="6" className="text-center font-bold text-gray-500 py-6">
      Loading...
    </td>
  </tr>}
{doctorList.length === 0 &&searchTerm.trim()!=="" ? (
  <tr>
    <td colSpan="6" className="text-center text-gray-500 py-6">
      No doctor found with the name &quot;<span className="font-semibold">{searchTerm}</span>&quot;
    </td>
  </tr>
) : (
  filteredDoctors.map((doctor) => (
    <tr key={doctor._id} className="border-t hover:bg-blue-50 transition-all">
      <td className="px-4 py-2">
        <Image
          src={doctor.image}
          alt={doctor.name}
          className="rounded-full object-cover h-fit border"
          width={50}
          height={50}
        />
      </td>
      <td className="px-4 py-2">
        {doctor.name.charAt(0).toUpperCase()}
        {doctor.name.slice(1).toLowerCase()}
      </td>
      <td className="px-4 py-2">{doctor.specialty}</td>
      <td className="px-4 py-2">{ doctor.email  ||doctor.phone || "not provided"}</td>
      <td className="py-3 px-4">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            doctor.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {doctor.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="py-3 px-4">
  <Link href={`/admin/doctors/${doctor._id}`}>
    <button  className="text-blue-600 text-sm font-medium hover:underline">
      View
    </button>
  </Link>
  {" / "}
  <button onClick={()=>{
    handleToggleModal()
   handleEditDoctor(doctor)
  }} className="text-black text-sm font-medium hover:underline"   >
    Edit
  </button>
</td>

    </tr>
  ))
)}
</tbody>
          </table>
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
    {`Showing ${total} of ${doctors.length} doctors`}

  </h2>

  <button
    onClick={() => {
      setCurrentPage(currentPage + 1);
    }}
    disabled={lastIndex === doctors.length}
    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      lastIndex === doctors.length
        ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
        : 'bg-white text-[#207dff] border border-[#207dff] hover:bg-[#207dff] hover:text-white'
    }`}
  >
    Next
  </button>
</div>

    </div>
  );
}

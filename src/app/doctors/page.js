'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';


const Doctors = () => {
  const { doctor, isLoading } = useAuth();
  const [doctors, setDoctors] = useState(doctor);
  const [special, setSpecial] = useState([]);
  const [days, setDays] = useState([]);
  const [showSpecialties, setShowSpecialties] = useState(true);
  const [showDays, setShowDays] = useState(true);

  useEffect(() => {
    setDoctors(doctor);
  }, [doctor]);

  const handleSpecialtyChange = (specialty) => {
    let updatedSpeciality;
    if (special.includes(specialty)) {
      updatedSpeciality = special.filter((item) => item !== specialty);
    } else {
      updatedSpeciality = [...special, specialty];
    }
    setSpecial(updatedSpeciality);

    if (updatedSpeciality.length === 0) {
      setDoctors(doctor);
    } else {
      const newDoctors = doctor.filter((item) =>
        updatedSpeciality.includes(item.specialty)
      );
      setDoctors(newDoctors);
    }
  };

  const dateChange = (day) => {
    let updatedDays;
    if (days.includes(day)) {
      updatedDays = days.filter((item) => item !== day);
    } else {
      updatedDays = [...days, day];
    }
    setDays(updatedDays);

    if (updatedDays.length === 0) {
      setDoctors(doctor);
    } else {
      const newDoctors = doctor.filter((item) =>
        item.availableDays.some((d) =>
          updatedDays.some((selected) =>
            d.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
      setDoctors(newDoctors);
    }
  };

  const specialties = new Set(['general', ...doctor.map((doc) => doc.specialty)]);

  // pagination 
  const itemsPerPage=6

  const [currentPage,setCurrentPage]=useState(1)

  const startIndex=(currentPage-1)*itemsPerPage

  const lastIndex=startIndex+itemsPerPage

  const doctorLists=doctors.slice(startIndex,lastIndex)

  const total=Math.min(lastIndex,doctors.length)
const formatName=(name)=>{
  let doctorName=name.trim().split(' ')[1]||[0]
let formattedName = doctorName.toLowerCase().startsWith("dr")
  ? doctorName.charAt(0).toUpperCase() + doctorName.slice(1)
  : "Dr. " + doctorName.charAt(0).toUpperCase() + doctorName.slice(1);
  return formattedName
}




  return (
    <main className="container">

      <div className="pt-28 grid gap-5 md:grid-cols-5">
        {/* Filter Sidebar */}
        <div className="w-full hidden md:flex flex-col gap-5 md:col-span-1 border-2 sticky top-5 bg-white self-start h-fit">
          <div className="border-b">
            <h2 className="text-2xl font-bold border-b p-2">Filter by Specialty</h2>
            {[...specialties].map((specialty, index) => (
              <div key={index + 1} className="flex items-center gap-2 px-2 py-1">
                <input
                  id={`${specialty}-${index}`}
                  type="checkbox"
                  onChange={() => handleSpecialtyChange(specialty)}
                  checked={special.includes(specialty)}
                />
                <label htmlFor={`${specialty}-${index}`}>
                  {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold border-b p-2">Filter by Days</h2>
            {['mon', 'tue', 'wed', 'thurs'].map((day, index) => (
              <div key={index + 1} className="flex items-center gap-2 px-2 py-1">
                <input
                  id={`${day}-${index}`}
                  type="checkbox"
                  onChange={() => dateChange(day)}
                  checked={days.includes(day)}
                />
                <label htmlFor={`${day}-${index}`}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Filter */}
        <div className="md:hidden">
          <div
            className="flex justify-between items-center border-b p-2"
            onClick={() => setShowSpecialties((prev) => !prev)}
          >
            <h2 className="text-sm font-bold">Filter by Specialty</h2>
            <FiChevronDown className={`transition ${showSpecialties ? 'rotate-180' : ''}`} />
          </div>
          {showSpecialties && (
            <div className="pl-4">
              {[...specialties].map((specialty, index) => (
                <div key={index + 1} className="flex items-center gap-2 px-2 py-1">
                  <input
                    id={`${specialty}-${index}`}
                    type="checkbox"
                    onChange={() => handleSpecialtyChange(specialty)}
                    checked={special.includes(specialty)}
                  />
                  <label htmlFor={`${specialty}-${index}`}>
                    {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          )}

          <div
            className="flex justify-between items-center border-b p-2"
            onClick={() => setShowDays((prev) => !prev)}
          >
            <h2 className="text-sm font-bold">Filter by Days</h2>
            <FiChevronUp className={`transition ${showDays ? 'rotate-180' : ''}`} />
          </div>
          {showDays && (
            <div className="pl-4">
              {['mon', 'tue', 'wed', 'thurs'].map((day, index) => (
                <div key={index + 1} className="flex items-center gap-2 px-2 py-1">
                  <input
                    id={`${day}-${index}`}
                    type="checkbox"
                    onChange={() => dateChange(day)}
                    checked={days.includes(day)}
                  />
                  <label htmlFor={`${day}-${index}`}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Doctor Cards */}
       <>
       {!isLoading&&doctorLists.length==0&&<div className='flex items-center justify-center text-center margin-auto'>
  No doctor found for you search</div>}
        <div className="transition grid gap-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-4  md:col-span-4">
          
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
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
              ))
            : doctorLists?.map((doc, index) => (
                <div
                  key={index}
                  className="flex flex-col border border-gray-200 rounded-lg text-center"
                >
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    width={1000}
                    height={600}
                    className="rounded-t-lg object-cover"
                  />
                  <div className="flex flex-col gap-1 py-2 px-2">
                    <h3 className="text-xl font-bold">
                      {/* {doc.name.charAt(0).toUpperCase() + doc.name.slice(1)} */}
                      {formatName(doc.name)}
                    </h3>
                    <h4 className="text-[#207dff]">  {
         ` ${doc.specialty.charAt(0).toUpperCase() + doc.specialty.slice(1)}`} </h4>
                    {/* <p className="text-gray-600">            {doc.bio.charAt(0).toUpperCase() + doc.bio.slice(1).substring(0,50) + '...' }
  </p>
          */}
                    <div className="mt-auto">
                      <Link href={`/doctors/${doc._id}`}>
                        <button className="px-6 py-3 mt-1 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
                          View Doctor
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div></>
      </div>



    {isLoading?<></>: <>
    
    {doctorLists.length>0&& <div className="flex flex-col items-center justify-center gap-5 mb-5 py-5 md:flex-row">
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
    disabled={total === doctors.length}
    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      total === doctors.length
        ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
        : 'bg-white text-[#207dff] border border-[#207dff] hover:bg-[#207dff] hover:text-white'
    }`}
  >
    Next
  </button>
</div>}
    
    </>
    
   

}

    </main>
  );
};

export default Doctors;
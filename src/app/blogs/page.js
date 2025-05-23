'use client';

import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Page = () => {


    const blogPosts = [
        {
          img:"/blog1.webp",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          title: "The Vital Importance of Quality Sleep for Health",
          excerpt: "Chronic sleep deprivation can lead to serious health consequences including weakened immunity, weight gain, and increased risk of chronic diseases. Learn how proper sleep hygiene can transform your wellbeing."
        },
        {
          img:"/blog2.webp",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          // title: "5 Warning Signs You're Not Getting Enough Rest",
          title: "5 Warning Signs Your life dun dey spoil",
    
          excerpt: "From constant fatigue to mood swings, your body sends clear signals when you need more sleep. Discover these warning signs and practical solutions for better rest."
        },
        {
          img:"/blog3.webp",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          title: "How Sleep Affects Your Mental and Physical Health",
          excerpt: "Sleep is the foundation of good health. This article explores the science behind sleep's restorative powers and provides evidence-based tips for improving sleep quality."
        }
      ];
  const { doctor } = useAuth();
  const [doctors, setDoctors] = useState(blogPosts);
  const [special, setSpecial] = useState([]);
  const [days, setDays] = useState([]);
//   const [showSpecialties, setShowSpecialties] = useState(true);
//   const [showDays, setShowDays] = useState(true);

 
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
  const itemsPerPage=3

  const [currentPage,setCurrentPage]=useState(1)

  const startIndex=(currentPage-1)*itemsPerPage

  const lastIndex=startIndex+itemsPerPage

//   const doctorLists=doctors.slice(startIndex,lastIndex)

  const total=Math.min(lastIndex,doctors.length)
  
  return (
    <main className="container">
      <div className="pt-28 grid gap-5 md:grid-cols-5">
        {/* Filter Sidebar */}
        <div className=" hidden md:flex flex-col gap-5 md:col-span-1 border-2 sticky top-5 bg-white self-start h-fit">
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

        {/* Mobile Filter
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

         
         
        </div> */}

      
<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 col-span-4 bordee">
  {doctors.map((post, index) => (
    <div 
      key={index} 
      className="blog-post flex flex-col gap-4 p-4 border border-gray-200 rounded-lg"
    >
      <Image src={post.img} alt={post.title} width={1000} height={400}/>
      {/* Top-aligned content container */}
      <div className="flex flex-col flex-grow gap-4">
        <p className="text-gray-500 min-h-[1.5rem]">{post.date}</p>
        <h3 className="text-xl font-bold min-h-[3rem] line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
      </div>

      {/* Bottom-aligned button */}
      <div className="mt-auto">
        <button className="px-6 py-3 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
          Read more
        </button>
      </div>
    </div>
  ))}
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
    {`Showing ${total} of ${doctors.length} Blogs`}

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

    </main>
  );
};

export default Page
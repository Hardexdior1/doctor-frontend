'use client'

import { useState,useEffect} from 'react'
import endpointroute from '@/app/utils/endpointroute'
import AllDoctors from './components/AllDoctors'
import PastDoctors from './components/PastDoctors'
const Doctors = () => {
  const [activeTab, setActiveTab] = useState('browse')
  const [pastDoctors, setPastDoctors] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await endpointroute.get("/user-past-doctors")
        setPastDoctors(res.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold text-black mb-6">
        {activeTab === 'browse' ? 'Browse Doctors' : 'Book Previous Doctors'}
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 justify-between md:justify-start">
        <button
          onClick={() => setActiveTab('browse')}
          className={`py-2 font-semibold text-sm border-b-2 transition-all md:px-4 ${
            activeTab === 'browse'
              ? 'border-[#207dff] text-[#207dff]'
              : 'border-transparent text-gray-500 hover:text-[#207dff]'
          }`}
        >
          Browse Doctors
        </button>
        <button
          onClick={() => setActiveTab('previous')}
          className={`py-2 font-semibold text-sm border-b-2 transition-all md:px-4 ${
            activeTab === 'previous'
              ? 'border-[#207dff] text-[#207dff]'
              : 'border-transparent text-gray-500 hover:text-[#207dff]'
          }`}
        >
          Book Previous Doctors
        </button>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {activeTab === 'browse' && (
         <AllDoctors />
        )}

        {activeTab === 'previous' && (
          <div>
            <PastDoctors pastDoctors={pastDoctors} setActiveTab={setActiveTab}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PastDoctors = ({ pastDoctors,setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = pastDoctors.filter((doc) => {
    const lower = searchTerm.trim().toLowerCase();
    return (
      doc.name.toLowerCase().includes(lower) ||
      doc.specialty.toLowerCase().includes(lower)
    );
  });

  return (
    <main>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          className="w-full p-3 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {pastDoctors.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg mb-4">You have no past appointments yet.</p>
          {/* <Link href="/doctors"> */}
            <button onClick={(()=>{
                setActiveTab('browse')
            })} className="px-5 py-3 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
              Browse Doctors
            </button>
          {/* </Link> */}
        </div>
      ) : (
        <div className="grid gap-5">
          <div className="transition grid gap-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {filteredDoctors.map((doc, index) => (
              <div
                key={doc._id || index}
                className="flex flex-col border border-gray-200 rounded-lg text-center shadow-md"
              >
                <Image
                  src={doc.image}
                  alt={doc.name}
                  width={1000}
                  height={600}
                  className="rounded-t-lg object-cover w-full"
                />
                <div className="flex flex-col gap-1 py-3 px-3">
                  <h3 className="text-lg font-bold md:text-xl">
                    {doc.name.charAt(0).toUpperCase() + doc.name.slice(1)} 
                  </h3>
                  <h4 className="text-[#207dff] font-medium">{doc.specialty}</h4>
                  <p className="text-gray-600 text-sm line-clamp-3">{doc.bio}</p>
                  <div className="mt-3">
                                          <Link href={`/user/book-appointment/${doc._id}`}>
                      <button className="px-3 text-sm py-2 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition md:px-6 md:text-base">
                        Book again
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {filteredDoctors.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                No doctors matched your search.
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default PastDoctors;

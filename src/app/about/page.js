// 'use client';

// import React from "react";
// import { FaAmbulance, FaClinicMedical, FaUserMd, FaClock } from "react-icons/fa";
// import Image from "next/image";

// const services = [
//   {
//     id: 1,
//     title: "Emergency Services",
//     description: "24/7 critical care with advanced facilities and expert emergency teams.",
//     image: "/emergency.jpg",
//     icon: <FaAmbulance className="text-3xl text-[#207dff] mb-3" />,
//   },
//   {
//     id: 2,
//     title: "Outdoors Checkup",
//     description: "On-site health assessments for workplaces and community wellness programs.",
//     image: "/outdoors-checkup.jpg",
//     icon: <FaClinicMedical className="text-3xl text-[#207dff] mb-3" />,
//   },
//   {
//     id: 3,
//     title: "Qualified Doctors",
//     description: "Board-certified specialists for accurate diagnosis and treatment.",
//     image: "/doctors-team.jpg",
//     icon: <FaUserMd className="text-3xl text-[#207dff] mb-3" />,
//   },
//   {
//     id: 4,
//     title: "24 Hours Service",
//     description: "Round-the-clock medical support from our dedicated staff.",
//     image: "/24hours-service.jpg",
//     icon: <FaClock className="text-3xl text-[#207dff] mb-3" />,
//   },
//   {
//     id: 5,
//     title: "Others",
//     description: "Comprehensive care including diagnostics, specialist referrals, and patient education.",
//     image: "/24hours-service.jpg",
//     icon: <FaClock className="text-3xl text-[#207dff] mb-3" />,
//   },
// ];

// const AboutPage = () => {
//   return (
//     <main>
//       {/* Hero Section */}
//       <div className="pb-10 pt-20 mt-0 h-40vh py-16 bg-black">
//         <h2 className="text-4xl mt-14 font-bold text-center text-[#207dff] mb-12">About Us</h2>
//       </div>

//       {/* Intro Section */}
//       <section className="bg-[#f8fafe] py-16">
//         <div className="container mx-auto px-4">
//           <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
//             <h3 className="text-2xl font-semibold text-[#207dff] mb-4">Welcome to Mediplus Healthcare Center AI</h3>
//             <p className="text-gray-700 mb-4">
//               At Mediplus, we combine the power of modern medicine with cutting-edge AI technology to deliver personalized and efficient healthcare solutions. Our team of qualified doctors and dedicated staff work around the clock to ensure that your health remains our top priority.
//             </p>
//             <p className="text-gray-700">
//               Whether you visit our physical clinic or engage with us through remote services, Mediplus ensures accuracy, compassion, and innovation every step of the way. From emergency services to routine checkups, our goal is to make healthcare accessible and effective for all.
//             </p>
//           </div>

//           {/* Services Grid */}
//           <h3 className="text-2xl font-bold text-center text-[#207dff] mb-8">Our Core Services</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {services.map((service) => (
//               <div key={service.id} className="bg-white rounded-lg shadow-md p-6 text-center">
//                 {service.icon}
//                 <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
//                 <p className="text-sm text-gray-600">{service.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default AboutPage;


'use client';

import React from "react";
import { FaAmbulance, FaClinicMedical, FaUserMd, FaClock } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Emergency Services",
    description: "24/7 critical care with advanced facilities and expert emergency teams.",
    icon: <FaAmbulance className="text-3xl text-[#207dff] mb-3" />,
  },
  {
    id: 2,
    title: "Outdoors Checkup",
    description: "On-site health assessments for workplaces and community wellness programs.",
    icon: <FaClinicMedical className="text-3xl text-[#207dff] mb-3" />,
  },
  {
    id: 3,
    title: "Qualified Doctors",
    description: "Board-certified specialists for accurate diagnosis and treatment.",
    icon: <FaUserMd className="text-3xl text-[#207dff] mb-3" />,
  },
  {
    id: 4,
    title: "24 Hours Service",
    description: "Round-the-clock medical support from our dedicated staff.",
    icon: <FaClock className="text-3xl text-[#207dff] mb-3" />,
  },
  {
    id: 5,
    title: "Others",
    description: "General consultations, diagnostics, patient education, and more.",
    icon: <FaClock className="text-3xl text-[#207dff] mb-3" />,
  },
];

const AboutPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-20  h-40vh  bg-black">
        <h1 className="text-4xl font-bold text-[#207dff] mt-10">About Us</h1>
      </section>

      {/* About Text Section */}
      <section className="bg-[#f8fafe] py-16">
        <div className="container mx-auto px-4 md:px-10">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#207dff] mb-4">Welcome to Mediplus Healthcare Center</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Mediplus Healthcare Center is a trusted name in quality and compassionate healthcare. Our goal is to provide accessible, affordable, and reliable medical services to individuals and families within our community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With experienced doctors, modern facilities, and a caring team, Mediplus is here to serve your needs — from emergencies to everyday wellness. We&apos;re not just a clinic; we&apos;re a support system for your health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-2xl font-bold text-center text-[#207dff] mb-10">Our Core Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#f8fafe] border rounded-lg shadow-sm p-6 text-center hover:shadow-md transition"
              >
                {service.icon}
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;

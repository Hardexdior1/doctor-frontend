
"use client";

import Image from "next/image";
import Link from "next/link";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import ConsultationForm from './components/ConsultationForm'
import hero1 from "../../public/hero.webp"
import Appointmentform from './components/AppointmentForm'
import { CalendarCheck, AlertTriangle, Repeat, Heart, Clock, UserPlus, Ban } from 'lucide-react'
   import Faq from "./components/Faq"

import { 
  FaAmbulance, 
  FaUserMd, 
  FaClock ,
  FaBrain, 
  FaClinicMedical, 
  FaTooth, 
  FaEye, 
  FaHeartbeat, 
  FaBone, 
  FaAtom, 
  FaXRay 
} from 'react-icons/fa';
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import BlogSection from './components/Blog'
// import CarouselSpacing from "./components/Testimonials";
export default function Home() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when the component comes into view
    threshold: 0.2, // Trigger when 20% of the element is visible
  });
  
const {doctor,isLoading,user}=useAuth()
console.log(user)
  
  const services = [
    {
      id: 1,
      title: "Emergency Services",
      description: "24/7 critical care with advanced facilities and expert emergency teams.",
      image: "/emergency.jpg",
      icon:<FaAmbulance />
    },
  
    {
      id: 2,
      title: "Outdoors Checkup",
      description: "On-site health assessments for workplaces and community wellness programs.",
      image: "/outdoors-checkup.jpg",
      icon:<FaClinicMedical />

    },
    {
      id: 3,
      title: "Qualified Doctors",
      description: "Board-certified specialists for accurate diagnosis and treatment.",
      image: "/doctors-team.jpg",
      icon:<FaUserMd />

    },
    {
      id: 4,
      title: "24 Hours Service",
      description: "Round-the-clock medical support from our dedicated staff.",
      image: "/24hours-service.jpg",
      icon:<FaClock />

    },
    {
      id: 5,
      title: "Others",
      description: "Round-the-clock medical support from our dedicated staff.",
      image: "/24hours-service.jpg",
      icon:<FaClock />

    }
  ];
  const medicalDepartments = [
    {
      id: 1,
      name: "Neurology",
      description: "Specialized care for brain and nervous system disorders",
      icon: <FaBrain className="text-blue-500 text-3xl" />
    },
    {
      id: 2,
      name: "Surgical",
      description: "Advanced surgical procedures with cutting-edge technology",
      icon: <FaClinicMedical className="text-green-500 text-3xl" />
    },
    {
      id: 3,
      name: "Dental",
      description: "Complete oral health services and cosmetic dentistry",
      icon: <FaTooth className="text-teal-500 text-3xl" />
    },
    {
      id: 4,
      name: "Ophthalmology",
      description: "Eye care and vision correction specialists",
      icon: <FaEye className="text-purple-500 text-3xl" />
    },
    {
      id: 5,
      name: "Cardiology",
      description: "Comprehensive heart health and cardiovascular care",
      icon: <FaHeartbeat className="text-red-500 text-3xl" />
    },
    {
      id: 6,
      name: "Traumatology",
      description: "Treatment for injuries and accident-related conditions",
      icon: <FaBone className="text-yellow-500 text-3xl" />
    },
    {
      id: 7,
      name: "Nuclear Magnetic",
      description: "Advanced imaging and diagnostic services",
      icon: <FaAtom className="text-indigo-500 text-3xl" />
    },
    {
      id: 8,
      name: "X-ray",
      description: "Diagnostic imaging and radiology services",
      icon: <FaXRay className="text-gray-500 text-3xl" />
    },
    {
      id: 9,
      name: "phsycology",
      description: "Treatment for injuries and accident-related conditions",
      icon: <FaBone className="text-yellow-500 text-3xl" />
    },
  ];

  
  const [bookingType, setBookingType] = useState('user')

  const userSteps = [
    {
      icon: <CalendarCheck className="w-6 h-6 text-blue-600" />,
      title: 'Track All Your Bookings',
      description: 'View your appointment history anytime, anywhere. when you create an account with us.',
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: 'Emergency Booking Support',
      description: 'Jump the line with urgent booking priority.',
    },
    {
      icon: <Repeat className="w-6 h-6 text-green-600" />,
      title: 'ReSchedule Your Appointments Instantly',
      description: 'Need to reschedule? Reschedule with just one click.',
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: 'Save Previous Doctors',
      description: "Quick access to doctors you've had then reschedule an appointment with them again if you want.",
    },
  ]
  const guestSteps = [
    {
      icon: <UserPlus className="w-6 h-6 text-blue-600" />,
      title: 'Quick Booking Without Signup',
      description: 'Just browse doctors, enter your info, pick a time and book an appointment.',
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      title: 'One-Time Access',
      description: 'Confirm appointment via email or phone.',
    },
    {
      icon: <Ban className="w-6 h-6 text-gray-600" />,
      title: 'Limited Features',
      description: 'No history tracking or emergency booking.',
    },
  ]

  const activeSteps = bookingType === 'user' ? userSteps : guestSteps

  
  const stats = [
    { title: "30", subtitle: "years of experience" },
    { title: "25,000", subtitle: "happy clients" },
    { title: "84", subtitle: "numbers of doctors" },
    { title: "300", subtitle: "number of staff" }
  ];

  
  return (
    <main>

{/* hero section */}
<div className="relative z-15 overflow-hidden  w-full h-screen flex flex-col items-center justify-center xl:h-screen ">
      <Image
        className="absolute h-full object-cover w-full "
       width={1000}
       height={1000}
       src={hero1}

        alt="hero"
      />
      
      

      <div className="absolute inset-0 bg-black bg-opacity-15"></div>

      <div className="relative  container  grid  items-center justify-center text-left my-24 text-white px-6 xl:grid-cols-2 xl-my-0">
      <div className="flex flex-col gap-5 lg:container">
      <h5 className="text-[#207dff] font-semibold">Welcome to Mediplus
      </h5>
      <h1 className="font-bold text-white">We are here
      for your Care</h1>
        {/* <p className="text-lg text-black md:text-xl"> */}
        {/* <p className="text-lg text-gray-100 md:text-xl"> */}
<p className="text-lg text-white/95 md:text-xl">

        Your health is our priority. Book an appointment today and take the first step toward better care, comfort, and lasting well-being with trusted experts.          
          </p>
       <div> 
        <a href="#appointment" > <button className="inline-block px-6 py-5 bg-[#207dff] text-white rounded-full font-semibold hover:bg-gray-300 transition">
          Make an appointment
        </button></a>
       </div>
      </div>
      </div>
    </div>   


    <Appointmentform />  
{/* medical departments */}
    <section className="py-20 my-10">
          <h2 className="font-bold text-center  text-black mb-8"> Our Medical Departments </h2>

<div className="grid  lg:grid-cols-3 items-center" id="deparment">
     <div>
     <Image
        className=" object-cover w-full hidden lg:col-span-1 lg:block lg:h-screen  xxl:h-fit"
       width={1000}
       height={1000}
       src="/shake.webp"

        alt="doctor-shaking-patient"
      />
     </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2 lg:grid-cols-3 lg:h-screen">
 
 {medicalDepartments.map((department, index) => (
  <div 
    key={department.id} 
    className={`
      group  px-5 py-8 border bg-white hover:bg-[#207dff] hover:shadow-lg transition-all duration-300 
       ${index >= 6 ? 'hidden sm:block' : ''}
    `}
  >
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 group-hover:text-white">
        {department.icon}
      </div>
      <h3 className={`text-xl font-semibold mb-2 group-hover:text-white`}>{department.name}</h3>
      <p className={`text-[#999999] group-hover:text-white/80 `}>{department.description}</p>
    </div>
  </div>
))}
</div>
    

     
     </div>







     </section>


     {/* how it works */}
     <section id="howitworks" className="py-20 border-t bg-gray-200">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <header className="mb-12 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900">Booking Made Simple</h2>
      <p className="mt-2 text-sm text-gray-600">
        Choose your booking style and follow the steps to get started.
      </p>
    </header>

    {/* Booking Toggle */}
    <div className="flex justify-center gap-6 mb-10">
      <button
        onClick={() => setBookingType('user')}
        className={`flex items-center gap-2 px-6 py-2 rounded-md border text-sm font-medium transition ${
          bookingType === 'user'
            ? 'bg-[#207dff] text-white border-blue-600'
            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
        }`}
      >
        <span>👤</span> Book as User
      </button>
      <button
        onClick={() => setBookingType('guest')}
        className={`flex items-center gap-2 px-6 py-2 rounded-md border text-sm font-medium transition ${
          bookingType === 'guest'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
        }`}
      >
        <span>🚶‍♂️</span> Book as Guest
      </button>
    </div>

    {/* Timeline Steps */}
    <div className="relative border-l-2 border-blue-100 pl-6 space-y-10">
      {activeSteps.map((step, index) => (
        <div key={index} className="relative group">
          <div className="absolute -left-4 top-1 w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
            {index + 1}
          </div>
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-blue-600 text-xl mb-1">{step.icon}</div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Final Note */}
    <div className="mt-16 bg-blue-50 p-6 rounded-lg shadow-inner">
      <h4 className="text-lg font-semibold text-blue-800 text-center mb-4">After Booking Confirmation</h4>
      <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
        <li>You’ll receive an email confirmation for your appointment.</li>
        <li>On the scheduled day, go directly to the hospital.</li>
        <li>The receptionist will verify your name and details.</li>
        <li>Your doctor will attend to you as scheduled.</li>
      </ul>
    </div>
  </div>
</section>

{/* About */}

{/* <section className="container flex flex-col gap-4 bg-[#ffffff] py-16 p-4 bg-from-l-red-400 to-r-blues-300" id="whoweare">
     
     <h2 className="font-bold text-center  text-black">Who We Are </h2>

     <div className=" gap-8 grid md:grid-cols-2 items-center lg:container xl:gap-16">

     <div>
     <Image
        className=" object-contain w-full "
       width={1000}
       height={200}
       src="/about.jpg.webp"

        alt="hero"
      />
     </div>

     <div className="flex flex-col gap-4">
     <h2 className="font-bold">We Are <span className="text-[#207dff]">MediPlus</span> Medical Center</h2>
     <p>Our practice provides comprehensive healthcare services with expert physicians in a welcoming environment. With easy online booking, we ensure prompt access to quality care tailored to your needs. Your wellbeing is our focus, supported by modern facilities and compassionate professionals dedicated to your health.</p>

     <div className="flex flex-col gap-3 xl:flex-row">
     <a href="#appointment" > 
     <button className="inline-block px-6 py-4 bg-[#207dff] text-white rounded-full font-semibold hover:bg-white border border-[#207dff] hover:text-[#207dff] transition">
          Make an appointment
        </button>
        </a>
    
        <a href="#contact" > 
        <button className="inline-block px-6 py-4 bg-[#fe5f55] text-white rounded-full font-semibold hover:bg-white hover:text-[#fe5f55] border border-[#fe5f55] transition">
          Contact us
        </button>
        </a>
       
        
        </div>
     </div>

     
     </div>








     </section> */}


      







{/* services */}
{/* <section className="container py-16 bg-gray-100" id="contact">
     
 
     <div className="gap-8 grid lg:grid-cols-2 items-center xl:container xl:gap-16 ">
     <div className=" flex flex-col gap-6">
     
      <h2 className="font-bold">Our Services</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2  gap-8 ">
          {services.map((service) => (
            <div key={service.id}  className={`${service.title=='Others'?'hidden':'flex items-top gap-4'}`}>
              <div className="h-fit rounded-full p-4 bg-[#ffeeed] text-[#fe5f55] text-4xl" >
               {service.icon}
              </div>
             <div>  <h2 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p></div>
            </div>
          ))}
        </div>
     

     </div>

    
     <ConsultationForm />

     
     </div>

     </section> */}
   
    {/* qualified doctors */}

 <section  className="container bg-white flex flex-col gap-12 py-16 md:py-20 lg:container">
<div className="flex text-center  flex-col gap-4 items-center justify-center"><h2 className="font-bold">Our Qualified Doctors

</h2>
<p className="text-[#999999] max-w-4xl">
Meet our trusted specialists dedicated to your care. Explore profiles of board-certified physicians with expertise across all major medical fields.
</p></div>
<div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 lg:container">
{isLoading ? (
  // Show 3 dummy skeletons (adjust the number as needed)
  Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="blog-post flex flex-col animate-pulse border border-gray-200 rounded-lg text-center"
    >
      {/* Image Skeleton */}
      <div className="w-full h-[200px] bg-gray-300 rounded-t-lg" />

      <div className="flex flex-col gap-2 py-2 px-2">
        {/* Name Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto" />

        {/* Specialty Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />

        {/* Bio Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-1" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />

        {/* Button Skeleton */}
        <div className="mt-4 w-1/2 h-10 mx-auto bg-gray-300 rounded-full" />
      </div>
    </div>
  ))
) : (
  doctor?.slice(0,4).map((doc, index) => (
    <div
      key={index}
      className="blog-post flex flex-col border border-gray-200 rounded-lg text-center "
    ><Image
  src={doc.image}
  alt={doc.name}
  width={1000}
  height={600}
  className="w-full  sm:h-72 md:h-50 object-cover rounded-tl-lg rounded-tr-lg "
/>

      {/* <Image src={doc.image} alt={doc.name} width={1000} height={600} className="rounded-tl-lg rounded-tr-lg md:max-h-42 object-cover"  /> */}
      <div className="flex flex-col gap-1 py-2 px-2">
        <h3 className="text-xl font-bold">  {doc.name.toUpperCase().startsWith("DR")
        ? doc.name.charAt(0).toUpperCase() + doc.name.slice(1)
        : `Dr. ${doc.name.charAt(0).toUpperCase() + doc.name.slice(1)}`}  </h3>
        
        <h4 className="text-[#207dff]">{` ${doc.specialty.charAt(0).toUpperCase() + doc.specialty.slice(1)}`}</h4>
        <p className="text-gray-600">  {
         ` ${doc.bio.charAt(0).toUpperCase() + doc.bio.slice(1).substring(0,50)}...`} 
        
        </p>
        <div className="mt-auto">
         <Link href={`/doctor-details/${doc._id}`}>
         <button className="px-6 w-full py-3 mt-1 bg-[#207dff] text-white rounded font-semibold hover:bg-blue-700 transition">
          View Doctor
          </button>
         </Link>
        </div>
      </div>
    </div>
  ))
)}

</div>
{doctor.length>4 && <div className="flex flex-col items-center justify-center">
<Link href={`/doctors`}>
         <button className="px-6 py-3 mt-1 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
         View All Doctors
          </button>
         </Link>
</div>}
</section>


{/* fun facts */}
 <div className="relative py-20 container   flex flex-col items-center justify-center min-h-fit">
  {/* Background Image */}
  <Image
    className="absolute h-full w-full object-cover "
    width={1000}
    height={500}
    src={hero1}
    alt="hero"
    priority
  />
  
  <div className="absolute inset-0 bg-[#207dff] bg-opacity-70"></div>
 {/* content */}
 <div className="grid z-10   items-center justify-center  md:grid-cols-3 md:px-20">
  <div className="flex flex-col gap-4">
  <h4 className="text-[#fff] font-semibold">Fun facts
  </h4>
  <h2 className="text-white font-bold"> Over 5,100 patients trust us</h2>
  <div className="hidden md:block">
    
        
        <a href="/doctors" > <button className="inline-block px-6 py-4 bg-black text-white rounded-full font-semibold hover:bg-white border border-[#207dff] hover:text-[#207dff] transition">
          Make an appointment
        </button></a></div>

  </div>

 <div className="grid my-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:col-span-2 md:my-0" ref={ref}>
      {stats.map((item, index) => (
        <div 
          key={index} 
          className={`
            px-20 py-10 border border-gray-200 border-1 
            ${index==0?'border-t-0 border-l-0':''}  
            ${index==1?'border-t-0 border-r-0':''} 
            ${index==2?'border-b-0 border-l-0':''}   
            ${index==3?'border-b-0 border-r-0':''} 
          `}
        >
          <div className="flex text-white flex-col items-center text-center">
            <h2 className="font-bold mb-2">
              {inView ? (
                <CountUp 
                  end={parseInt(item.title.replace(/,/g, ''))} 
                  duration={2.5}
                  separator={item.title.includes(',') ? ',' : ''}
                />
              ) : (
                '0'
              )}
            </h2>
            <p className="font-bold text-[#ffffffcc]">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
   

      
</div>
</div>

{/* <CarouselSpacing /> */}
{/* your health is our piority */}
<section className="relative py-20  flex flex-col items-center justify-center min-h-fit">
  {/* Background Image */}
  <Image
    className="absolute h-full w-full object-cover z-0"
    width={1000}
    height={500}
    src="/bg_2.jpg.webp"
    alt="hero"
    priority
  />
  
  <div className="absolute inset-0 bg-black bg-opacity-30"></div>

  {/* Hero Content */}
  <div className="relative z-10 container px-6 my-10 text-center text-white">
    <div className="flex flex-col gap-5 items-center justify-center">
      <h1 className="font-bold text-3xl md:text-4xl">Your Health is Our Priority</h1>
      <p className="text-lg text-[#ffffffcc] max-w-4xl md:text-xl">
        Our dedicated team provides comprehensive healthcare services tailored to your unique needs, 
        with state-of-the-art facilities and compassionate care.
      </p>
      <div>
       
        <a href="/doctors" > 
     <button className="inline-block px-6 py-4 bg-[#207dff] text-white rounded-full font-semibold hover:bg-white border border-[#207dff] hover:text-[#207dff] transition">
          Make an appointment
        </button>
        </a>
      </div>
    </div>
  </div>
</section>


 



 
<section className="container">
  <Faq/>
</section>




{/* blogs */}
<BlogSection />
{/* <section className="container flex flex-col bg-[#ffffff] gap-12 py-16 md:py-20">
<div className="flex text-center  flex-col gap-4 items-center justify-center"><h2 className="font-bold"> Get Every Single Updates Here
</h2>
<p className="text-[#999999] max-w-4xl">
  Discover valuable health insights and practical wellness tips through our expert-curated articles. 
  Stay informed about the latest medical advancements and preventive care strategies.
</p></div>
<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:container">
  {blogPosts.map((post, index) => (
    <div 
      key={index} 
      className="blog-post flex flex-col gap-4 p-4 border border-gray-200 rounded-lg"
    >
      <Image src={post.img} alt={post.title} width={1000} height={400}/>
      <div className="flex flex-col flex-grow gap-4">
        <p className="text-gray-500 min-h-[1.5rem]">{post.date}</p>
        <h3 className="text-xl font-bold min-h-[3rem] line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
      </div>

      <div className="mt-auto">
        <button className="px-6 py-3 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
          Read more
        </button>
      </div>
    </div>
  ))}
</div>
<div className="flex items-center justify-center">
  <Link href={`/blogs`}>  <button className="px-6 py-3 mt-1 bg-[#207dff] text-white rounded-full font-semibold hover:bg-blue-700 transition">
         View All Blogs
          </button></Link>
          
          </div>
</section> */}

      

     

    </main>
  );
}



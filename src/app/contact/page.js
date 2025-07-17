"use client";
import { useState, useRef } from "react";
import endpointroute from "../utils/endpointroute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef();
  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("message", messageRef.current.value);
    formData.append("attachment", fileRef.current.files[0]);

    try {
      const res = await endpointroute.post("/contact", formData);
      toast.success(res?.data?.message);
      nameRef.current.value=""
      emailRef.current.value=""
      phoneRef.current.value=""
      messageRef.current.value=""
      fileRef.current.value=null

    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
   <main>
     <div className="pb-10 pt-20 mt-0 h-40vh py-16 bg-black">
            <h2 className="text-4xl mt-14 font-bold text-center text-[#207dff] mb-12">Contact Us</h2>
        </div>
     <section className="bg-[#f8fafe] lg:container">
      <ToastContainer />
      <div className="container mx-auto ">
        {/* Hero Title */}
       

        {/* Contact Info Icons Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdEmail className="text-3xl text-[#207dff] mb-2" />
            <p className="font-semibold">Email</p>
            <p className="text-sm text-gray-600">adeniranquwam001@gmail.com</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdPhone className="text-3xl text-[#207dff] mb-2" />
            <p className="font-semibold">Phone</p>
            <p className="text-sm text-gray-600">09131114346</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <MdLocationOn className="text-3xl text-[#207dff] mb-2" />
            <p className="font-semibold">Address</p>
            <p className="text-sm text-gray-600 text-center">
              123 Example Address, Sha No Lost Street, Opp. No Lost Ejeh
            </p>
          </div>
        </div>

        {/* Form + Contact Info */}
        <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              ref={nameRef}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#207dff] outline-none"
            />
            <input
              type="email"
              ref={emailRef}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#207dff] outline-none"
            />
            <input
              type="tel"
              ref={phoneRef}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#207dff] outline-none"
            />
            <textarea
              rows={4}
              ref={messageRef}
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#207dff] outline-none"
            ></textarea>
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md font-medium text-white ${
                loading ? "bg-blue-400" : "bg-[#207dff] hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info Block (Repeated) */}
          <div className="bg-[#f0f4ff] p-6 rounded-md shadow-sm flex flex-col justify-center space-y-4">
            <h3 className="text-xl font-semibold text-[#207dff] mb-4">Get in Touch</h3>
            <p><span className="font-semibold">Email:</span> adeniranquwam001@gmail.com</p>
            <p><span className="font-semibold">Phone:</span> 09131114346</p>
            <p><span className="font-semibold">Address:</span> 123 Example Address, Sha No Lost Street, Opp. No Lost Ejeh</p>
            <p className="text-sm text-gray-700">Fill out the form or reach out using the contact info. We’ll get back to you ASAP!</p>
          </div>
        </div>
      </div>
    </section>
   </main>
  );
}

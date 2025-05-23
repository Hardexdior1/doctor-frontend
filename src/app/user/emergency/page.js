"use client";
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaTwitter, FaMapMarkerAlt } from 'react-icons/fa';
import endpointroute from '../../utils/endpointroute';
export default function ConsultationForm() {
  const [loading, setLoading] = useState(false);

  const phoneRef = useRef();
  const messageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
 
    formData.append("phone", phoneRef.current.value);
    formData.append("message", messageRef.current.value);

   
    if (phoneRef.current.value.trim() === '') {
      toast.error("phone is required");
    }
    if (messageRef.current.value.trim() === '') {
      toast.error("message is required");
    }
    if (
      phoneRef.current.value.trim() === '' &&
      messageRef.current.value.trim() === ''
    ) {
      toast.error("all fields are required");
    }

    try {
      const res = await endpointroute.post("/contact", formData);
      toast.success(res.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.error);
      toast.error(error?.response?.data?.error);

      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />

      {/* 📞 Contact Info Card */}
      <div className="bg-[#207dff] text-white rounded-xl p-6 mb-8 shadow-lg">
  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Contact Information</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg">
    <div className="flex items-center space-x-3">
      <FaEnvelope className="text-white text-xl" />
      <div>
        <p className="font-semibold text-white">Email:</p>
        <a href="mailto:adeniranquwam001@gmail.com" className="text-white hover:text-yellow-200 underline transition-colors">
          adeniranquwam001@gmail.com
        </a>
      </div>
    </div>
    
    <div className="flex items-center space-x-3">
      <FaPhoneAlt className="text-white text-xl" />
      <div>
        <p className="font-semibold text-white">Phone:</p>
        <a href="tel:09131114346" className="text-white hover:text-yellow-200 underline transition-colors">
          09131114346
        </a>
      </div>
    </div>
    
    <div className="flex items-center space-x-3">
      <FaWhatsapp className="text-white text-xl" />
      <div>
        <p className="font-semibold text-white">WhatsApp:</p>
        <a href="https://wa.me/2349131114346" target="_blank" className="text-white hover:text-yellow-200 underline transition-colors">
          Click to chat
        </a>
      </div>
    </div>
    
    <div className="flex items-center space-x-3">
      <FaTwitter className="text-white text-xl" />
      <div>
        <p className="font-semibold text-white">X (Twitter):</p>
        <a href="https://x.com/AdeniranQuwam" target="_blank" className="text-white hover:text-yellow-200 underline transition-colors">
          @AdeniranQuwam
        </a>
      </div>
    </div>
    
    <div className="flex items-center space-x-3">
      <FaMapMarkerAlt className="text-white text-xl" />
      <div>
        <p className="font-semibold text-white">Address:</p>
        <p className="text-white">1234 Example St, Lagos, Nigeria</p>
      </div>
    </div>
  </div>
</div>



<div className="bg-white p-8 rounded-lg shadow-md">
  <h4 className="font-bold mb-6 text-center text-[#207dff]">Emergency Assistance Form</h4>

  <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
    <div>
      <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
      <input
        type="tel"
        id="phone"
        placeholder="Phone (required)"
        ref={phoneRef}
        className="w-full px-4 py-2 border-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-gray-700 mb-2">Brief Message (optional)</label>
      <textarea
        id="message"
        rows={3}
        placeholder="Short description of your emergency"
        ref={messageRef}
        className="w-full border-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>

    <div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center ${
          loading
            ? 'bg-blue-400 cursor-not-allowed text-white'
            : 'bg-[#207dff] hover:bg-blue-700 text-white'
        }`}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5..."></path>
          </svg>
        )}
        {loading ? 'Sending Request...' : 'Submit Emergency Request'}
      </button>
    </div>
  </form>
</div>

    </div>
  );
}


"use client";
import { useState, useRef } from 'react';
import endpointroute from '../utils/endpointroute';

  import { ToastContainer, toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'


export default function ConsultationForm() {
 


const [loading,setLoading]=useState(false)

   const nameRef = useRef();
   const emailRef = useRef();
   const phoneRef = useRef();
   const messageRef = useRef();
   const fileRef = useRef();

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("message", messageRef.current.value);
    formData.append("attachment", fileRef.current.files[0]);
  if(nameRef.current.value.trim()==''){
    toast.error("name is required");
  }
  if(emailRef.current.value.trim()==''){
    toast.error("email is required");
  }
  if(phoneRef.current.value.trim()==''){
    toast.error("phone is required");
  }
  if(messageRef.current.value.trim()==''){
    toast.error("message is required");
  }
  if(emailRef.current.value.trim()==''&&phoneRef.current.value.trim()==''&&messageRef.current.value.trim()==''){
    toast.error("all fields are required");

  }
  
    try {
      const res = await endpointroute.post("/contact",formData);
  
      const result = res
      console.log(result);
      console.log(formData)
    //   alert(res.data.message)
      toast.success(res.data.message)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.error);
    console.log(error.response.data.error)
    setLoading(false)

    }
  };
  

  return (
   
           <div>
                  <ToastContainer />

     {/* Free Consultation Section */}
     <div className="bg-white p-8 rounded-lg shadow-md">
       <h4 className="font-bold mb-6 text-center font-bold text-[#207dff]">FREE CONSULTATION</h4>
       {/* <button onClick={handleSubmit}>submit</button> */}
       <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
         {/* Full Name - First */}
         <div className="md:col-span-2">
           <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
           <input 
             type="text" 
             id="name" 
             ref={nameRef}
             placeholder='your name'
             className="w-full px-4 py-2 border border-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
   
         {/* Phone */}
         <div>
           <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
           <input 
             type="tel" 
             id="phone" 
             placeholder='phone'
             ref={phoneRef}
             className="w-full px-4 border-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
   
        
         {/* email */}
         <div>
           <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
           <input 
             type="email" 
             id="email" 
             placeholder='your email'
             ref={emailRef}
             className="w-full border-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
    
   <div className="md:col-span-2">
  <label className="block mb-2">
    <span className="text-gray-700">Want to show image?</span>
  </label>
  
    <input
      type="file"
      name="attachment"
      ref={fileRef}
      className="cursor-pointer border border-4 w-full py-2"
      accept="image/*"
    />
</div>

         {/* Message - Before Submit Button */}
         <div className="md:col-span-2">
           <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
           <textarea 
             id="message" 
             rows={4} 
             placeholder='write your message here'
             ref={messageRef}

             className="w-full border-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           ></textarea>
         </div>
         
         {/* Submit Button - Last */}
         <div className="md:col-span-2">
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
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )}
  {loading ? 'Booking...' : 'Book Appointment'}
</button>

         </div>
       </form>
     </div>
   
     
   </div>
  );
}
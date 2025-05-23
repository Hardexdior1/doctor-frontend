'use client'
import Image from "next/image"

const Form=({doctor})=>{
    const handleSubmit = (e) => {
        e.preventDefault();
    
      };
      console.log(doctor.doctor)
return  <main className="py-6 px-4 md:px-8">
<div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
  <h1 className="text-xl font-semibold mb-4">Book Appointment with {doctor.doctor.name.charAt(0).toUpperCase() + doctor.doctor.name.slice(1)} </h1>

  {/* Doctor Details */}
  <div className="flex items-center mb-6">
    <Image
      src={doctor.doctor.image}
      alt={doctor.doctor.name}
      width={50}
      height={50}
      className="rounded-full mr-4"
    />
    <div>
      <h3 className="text-lg font-medium">                {doctor.doctor.name.charAt(0).toUpperCase() + doctor.doctor.name.slice(1)}
      </h3>
      <p className="text-sm text-gray-500">{doctor.doctor.specialty}</p>
    </div>
  </div>

  {/* Booking Form */}
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="patientName" className="block text-sm font-medium">Full Name</label>
      <input
        type="text"
        id="patientName"
        // value={patientName}
        // onChange={(e) => setPatientName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
      <input
        type="tel"
        id="phoneNumber"
        // value={phoneNumber}
        // onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="appointmentDate" className="block text-sm font-medium">Appointment Date</label>
      <input
        type="date"
        id="appointmentDate"
        // value={appointmentDate}
        // onChange={(e) => setAppointmentDate(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="appointmentTime" className="block text-sm font-medium">Appointment Time</label>
      <input
        type="time"
        id="appointmentTime"
        // value={appointmentTime}
        // onChange={(e) => setAppointmentTime(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="reason" className="block text-sm font-medium">Reason for Visit</label>
      <textarea
        id="reason"
        // value={reason}
        // onChange={(e) => setReason(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
        rows="3"
      />
    </div>

    {/* Paystack Payment Integration */}
    {/* <PaystackButton {...componentProps} /> */}
  </form>
</div>
</main>
}
export default Form
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import endpointroute from '@/app/utils/endpointroute'
const Form = ({ doctor }) => {
  const [loadingAppointment, setLoadingAppointment] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: '',
  })

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setLoadingAppointment(true)
    try {
      await endpointroute.post(`/create-appointment`, {
        ...bookingForm,
        doctorId: doctor.doctor._id,
      })
      toast.success('Appointment booked successfully!')
      setBookingForm({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        message: '',
      })
    } catch (err) {
      console.log(err.response?.data || err.message)
      toast.error('Failed to book appointment')
    } finally {
      setLoadingAppointment(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingForm((prev) => ({ ...prev, [name]: value }))
  }
let doctorName=doctor?.doctor.name.trim().split(' ')[1]||[0]
let formattedName = doctorName.toLowerCase().startsWith("dr")
  ? doctorName.charAt(0).toUpperCase() + doctorName.slice(1)
  : "Dr. " + doctorName.charAt(0).toUpperCase() + doctorName.slice(1);
  return (
    <main className="min-h-screen bg-gray-50">
     
      <ToastContainer />
     <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#207dff] mb-10">
  Book  
{formattedName }   for     {doctor.doctor.specialty}
</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Appointment with {formattedName}
          </h2>

          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="col-span-1">
              <label className="text-sm text-gray-600 block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={bookingForm.name}
                onChange={handleInputChange}
                required
                placeholder="Enter full name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#207dff] focus:ring-2 focus:ring-[#207dff] transition hover:border-gray-400"
              />
            </div>

            {/* Phone */}
            <div className="col-span-1 ">
              <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={bookingForm.phone}
                onChange={handleInputChange}
                required
                placeholder="e.g. 08012345678"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#207dff] focus:ring-2 focus:ring-[#207dff] transition hover:border-gray-400"
              />
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label className="text-sm text-gray-600 block mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={bookingForm.email}
                onChange={handleInputChange}
                required
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#207dff] focus:ring-2 focus:ring-[#207dff] transition hover:border-gray-400"
              />
            </div>

            {/* Date */}
            <div className="col-span-1">
              <label className="text-sm text-gray-600 block mb-1">Appointment Date</label>
              <input
                type="date"
                name="date"
                value={bookingForm.date}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#207dff] focus:ring-2 focus:ring-[#207dff] transition hover:border-gray-400"
              />
            </div>

            {/* Time */}
            <div className="col-span-1">
              <label className="text-sm text-gray-600 block mb-1">Appointment Time</label>
              <input
                type="time"
                name="time"
                value={bookingForm.time}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#207dff] focus:ring-2 focus:ring-[#207dff] transition hover:border-gray-400"
              />
            </div>

            {/* Diagnosis */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600 block mb-1">Reason for Visit (Optional)</label>
              <textarea
                name="message"
                value={bookingForm.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your symptoms or concern..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#207dff] focus:ring-2 focus:ring-[#207dff] transition hover:border-gray-400"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loadingAppointment}
                className={`w-full py-3 mt-2 bg-[#207dff] text-white font-semibold rounded-lg transition hover:bg-[#1a6bd9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#207dff] ${
                  loadingAppointment ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {loadingAppointment ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Card */}
        <div className="bg-white order-1 md:order-2 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
          <Image
            src={doctor.doctor.image}
            alt={doctor.doctor.name}
            width={120}
            height={120}
            className="rounded-full mb-4 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-1"> {doctor.doctor.name.charAt(0).toUpperCase() + doctor.doctor.name.slice(1)}</h3>
          <p className="text-sm text-gray-500 mb-3">{doctor.doctor.specialty}</p>
          <p className="text-gray-600 text-sm">
            You are booking a consultation with one of our best professionals. Get expert help and personal care.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Form

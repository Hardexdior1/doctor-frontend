'use client'
import React, { useState } from 'react'
import { Calendar, Phone, Stethoscope, User, HeartPulse, Hospital, Syringe } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    date: '',
    sickness: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { fullName, phone, date, sickness, description } = formData
    if (!fullName || !phone || !date || !sickness || !description) {
      toast.error('Please fill in all fields.')
      return
    }

    setLoading(true)
 toast.success('Appointment request sent successfully!')
      setFormData({
        fullName: '',
        phone: '',
        date: '',
        sickness: '',
        description: '',
      })
   setLoading(false)
  }

  return (
    <section className='px-6 bg-opacity-30 bg-gray-200 -mt-20 pb-16' id="appointment">
{/* <div className=" bg-white absolute     z-40 shadow-md rounded-lg py-10 px-10 "> */}
<div className="bg-white relative shadow-md rounded-lg py-12  px-10 max-w-7xl mx-auto  md:py-20">

      <ToastContainer />

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT: Heading & Icons */}
        <div>
          <h2 className="text-4xl font-bold text-black mb-3">
            Book an Appointment 
          </h2>
            <h2 className="text-4xl font-bold text-black mb-3">
            <span className="text-[#207dff] font-semibold">Online</span>, It&apos;s{' '}
            <span className="text-[#207dff] font-semibold">Easy</span>.
          </h2>
          
          <p className="text-gray-600 mb-6">
            Please fill out the form and we’ll set an appointment for you. Or,
            call our HQ to set your time via phone.
          </p>

          {/* Icons */}
          <div className="flex flex-wrap gap-4 text-[#207dff]">
            <div className="flex items-center gap-2">
              <HeartPulse size={24} />
              <span className="text-gray-600">Cardiac Check</span>
            </div>
            <div className="flex items-center gap-2">
              <Hospital size={24} />
              <span className="text-gray-600">Hospital Visit</span>
            </div>
            <div className="flex items-center gap-2">
              <Syringe size={24} />
              <span className="text-gray-600">Vaccination</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="flex items-center bg-[#f0f8ff] px-3 rounded-md">
                <User className="text-[#207dff] mr-2" size={18} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 outline-none caret-[#207dff]"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Phone
              </label>
              <div className="flex items-center bg-[#f0f8ff] px-3 rounded-md">
                <Phone className="text-[#207dff] mr-2" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2  outline-none caret-[#207dff]"
                  placeholder="Phone number"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="flex items-center bg-[#f0f8ff] px-3 rounded-md">
                <Calendar className="text-[#207dff] mr-2" size={18} />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 outline-none caret-[#207dff]"
                />
              </div>
            </div>

            {/* Sickness */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sickness
              </label>
              <div className="flex items-center bg-[#f0f8ff] px-3 rounded-md">
                <Stethoscope className="text-[#207dff] mr-2" size={18} />
                <input
                  type="text"
                  name="sickness"
                  value={formData.sickness}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 outline-none caret-[#207dff]"
                  placeholder="e.g. Fever, Flu"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sickness Explanation
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}

              placeholder="Briefly explain your symptoms"
              className="w-full bg-[#f0f8ff] px-4 py-2 rounded-md outline-none caret-[#207dff]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#207dff] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#186fdd] transition duration-200"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
    <div />
    </section>
  )
}

export default AppointmentForm

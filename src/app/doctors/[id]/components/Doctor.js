'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import endpointroute from '@/app/utils/endpointroute'
const Doctor =  ({doctor}) => {
  const { id } = useParams()

console.log(doctor)
  const sortedReviews = doctor.review?.sort((a, b) => 
    new Date(a.createdAt) - new Date(b.createdAt)
  ) || []
  const [data, setData] = useState({
    reviews: sortedReviews,
    doctor: doctor.doctor || null,
    totalReviews: sortedReviews.length
  })
 
  const [activeTab, setActiveTab] = useState('reviews')
  const [reviewForm, setReviewForm] = useState({
    name: '',
    message: '',
    doctorId:id,
    date:new Date()
  })
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    message: '',
    diagnosis:""

  })
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 4




  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = data.reviews.slice(indexOfFirstReview, indexOfLastReview)
  const totalPages = Math.ceil(data.totalReviews / reviewsPerPage)

  const [loadingReview,setLoadingReview]=useState(false)
  const [loadingAPpointment,setLoadingAppointment]=useState(false)

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    console.log('review form',reviewForm)
setLoadingReview(true)
    try {
      // const createdAt = new Date().toISOString()
      const response = await endpointroute.post(`/create-review`,reviewForm)

      const newReview = {
        ...response.data.review
        ,
        createdAt: new Date().toISOString() 
      }
  
      setData(prev => {
        const updatedReviews = [...prev.reviews, newReview].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        const updatedTotal = prev.totalReviews ? prev.totalReviews + 1 : updatedReviews.length
  
        return {
          ...prev,
          reviews: updatedReviews,
          totalReviews: updatedTotal
        }
      })
  
      setReviewForm({ name: '', message: '' })
      toast.success('Review submitted successfully!')
    console.log(response)
      // Scroll to last page if review is not visible
      // setTimeout(() => {
      //   const newTotalReviews = data.totalReviews + 1
      //   const newTotalPages = Math.ceil(newTotalReviews / reviewsPerPage)
      //   setCurrentPage(newTotalPages)
      // }, 100)
      setLoadingReview(false)

    } catch (err) {
      toast.error('Failed to submit review')
      console.log(err)
      setLoadingReview(false)

    }
  }
  

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setLoadingAppointment(true)
    try {
      await endpointroute.post(`/create-appointment`, {
        ...bookingForm,
        doctorId: id,
      })
      toast.success('Appointment booked successfully!')
      setBookingForm({
        name: '',
        phone: '',
        email: '',
        date: '',
        message: '',
        diagnosis:""

      })
      setLoadingAppointment(false)
    } catch (err) {
        setLoadingAppointment(false)
        console.log(err)
      toast.error('Failed to book appointment')
    }
  }

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target
    if (formType === 'review') {
      setReviewForm(prev => ({ ...prev, [name]: value }))
    } else {
      setBookingForm(prev => ({ ...prev, [name]: value }))
    }
  }


  if (!doctor.doctor) {
    return (
      <div className="container mx-auto py-20">
        <p className="text-center">No doctor data found</p>
      </div>
    )
  }

  return (
    <main className="container mx-auto py-28">
      <ToastContainer />
      
  
<div className="bg-white border rounded-lg shadow-md overflow-hidden mb-8">
  <div className="flex flex-col md:flex-row">
    <div className="w-full md:w-1/4 relative h-[400px] bg-black md:h-[300px]" >
      <Image 
        src={data.doctor.image || '/doctor-placeholder.jpg'}
        alt={data.doctor.name}
        fill
        className="object-cover w-full"
        priority
      />
    </div>

    <div className="w-full md:w-2/3 p-6">
      <div className="flex flex-col h-fit">
        <div>
          <h1 className="text-3xl font-bold text-[#207dff] mb-2">  {data.doctor.name.toUpperCase().startsWith("DR")
        ? data.doctor.name.charAt(0).toUpperCase() + data.doctor.name.slice(1)
        : `Dr. ${data.doctor.name.charAt(0).toUpperCase() + data.doctor.name.slice(1)}`}  </h1>
          {/* <h1 >{data.doctor.name.charAt(0).toUpperCase()}{data.doctor.name.substring(1)} </h1> */}
          <p className="text-xl text-black">{` ${data.doctor.specialty.charAt(0).toUpperCase() + data.doctor.specialty.slice(1)}`}</p>

          {/* <p className="text-gray-700 mb-6">{data.doctor.bio}</p> */}
          <div className='w-full max-w-2xl'>

            <p className="text-gray-600 my-4 ">  {
         ` ${data.doctor.bio.charAt(0).toUpperCase() + data.doctor.bio.slice(1) } `} 
        </p>
          
          </div>
        
        {/* <h4 className="text-[#207dff]">{doc.specialty}</h4> */}
        
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-[#207dff]/10 px-4 py-2 rounded-full">
              <span className="font-medium text-[#207dff]">Contact: {data.doctor.phone}</span>
            </div>
            <div className="bg-[#207dff]/10 px-4 py-2 rounded-full">
              <span className="font-medium text-[#207dff]">Email: {data.doctor.email}</span>
            </div>
          </div>
 {data.doctor.isActive&& <div className="flex flex-wrap gap-2 mb-4">
  {data.doctor.availableDays[0]?.split(',').map((day, index) => (
    <span 
      key={index}
      className="bg-[#207dff] text-white px-3 py-1 rounded-full text-sm"
    >
      {day}
    </span>
  ))}
</div>}

 <span
      className={`px-2 py-1  rounded text-sm font-medium w-fit ${
        data.doctor?.isActive
          ? 'mt-4 bg-green-100 text-green-700'
          : 'mt-4 bg-red-100 text-red-700'
      }`}
    >
      {data.doctor.isActive ? 'Available for Booking' : 'Currently Unavailable'}
    </span>
          {/* <div className="flex flex-wrap gap-2">
            {data.doctor.availableDays?.map((day, index) => (
              <span 
                key={index}
                className="bg-[#207dff] text-white px-3 py-1 rounded-full text-sm"
              >
                {day}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reviews Section */}
        <div className="lg:col-span-2">
  <div className="bg-white rounded-lg shadow-md p-6 h-fit">
    <h2 className="text-2xl font-bold text-[#207dff] mb-6">
      Patient Reviews ({data.totalReviews})
    </h2>

    {currentReviews.length > 0 ? (
      <div className="space-y-6 max-h-[400px] overflow-y-auto w-full">
        {currentReviews.map((review) => {
          return (
            <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-[#207dff] text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                  {(review.name?.charAt(0) || 'A').toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 pl-16">{review.message}</p>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    )}

    {/* Pagination - Only show if more than 5 reviews */}
    {data.totalReviews > reviewsPerPage && (
      <div className="flex justify-center mt-8">
        <nav className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page ? 'bg-[#207dff] text-white' : 'border border-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    )}
  </div>
</div>

        <div className="lg:col-span-2 hidden ">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#207dff] mb-6">
              Patient Reviews ({data.totalReviews})
            </h2>
            
            {currentReviews.length > 0 ? (
              <div className="space-y-6 overflow-hidden">
                {currentReviews.map((review)=>{
                  return <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-[#207dff] text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                    {(review.name?.charAt(0) || 'A').toUpperCase()}

                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 pl-16">{review.message}</p>
                </div>
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            )}

            {/* Pagination - Only show if more than 5 reviews */}
            {data.totalReviews > reviewsPerPage && (
              <div className="flex justify-center mt-8">
                <nav className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-[#207dff] text-white' : 'border border-gray-300'}`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Combined Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            {/* Form Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3 font-medium ${activeTab === 'reviews' ? 'text-[#207dff] border-b-2 border-[#207dff]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Leave Review
              </button>
              <button
                className={`flex-1 py-3 font-medium ${activeTab === 'booking' ? 'text-[#207dff] border-b-2 border-[#207dff]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('booking')}
              >
                Book Appointment
              </button>
            </div>

            {/* Review Form */}
            {activeTab === 'reviews' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#207dff] mb-4">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={reviewForm.name}
                      onChange={(e) => handleInputChange(e, 'review')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#207dff]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={reviewForm.message}
                      onChange={(e) => handleInputChange(e, 'review')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#207dff]"
                      required
                    ></textarea>
                  </div>
                  {/* <button
                    type="submit"
                    className="w-full bg-[#207dff] hover:bg-[#1a6bd9] text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Submit Review
                  </button> */}
                  <button 
  type="submit"
  className={`w-full text-white font-medium py-2 px-4 rounded-lg transition ${loadingReview ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#207dff] hover:bg-[#1a6bd9]'}`}
  disabled={loadingReview} // This disables the button when loadingReview is true
>
  {loadingReview ? 'Loading...' : 'Submit Review'} {/* Show "Loading..." text when loading */}
</button>

                </form>
              </div>
            )}

            {/* Booking Form */}
            {activeTab === 'booking' && (
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#207dff] mb-4">Book Appointment</h3>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={(e) => handleInputChange(e, 'booking')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#207dff]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                      <input
                        type="text"
                        name="diagnosis"
                        value={bookingForm.diagnosis}
                        onChange={(e) => handleInputChange(e, 'booking')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#207dff]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={bookingForm.email}
                        onChange={(e) => handleInputChange(e, 'booking')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#207dff]"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={bookingForm.date}
                        onChange={(e) => handleInputChange(e, 'booking')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#207dff]"
                        required
                      />
                    </div>
                   
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                    <textarea
                      name="message"
                      rows="3"
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange(e, 'booking')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#207dff]"
                    ></textarea>
                  </div>
                  {/* <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Book Appointment
                  </button> */}

                  {doctor.isActive ? (
        <button
  type="submit"
  disabled={loadingAPpointment}
  className={`w-full font-medium py-2 px-4 rounded-lg transition 
    ${loadingAPpointment
      ? 'bg-gray-400 cursor-not-allowed text-white' 
      : 'bg-black hover:bg-gray-800 text-white'
    }`}
>
  {loadingAPpointment ? 'Booking...' : 'Book Appointment'} {doctor.isActive}
</button>
) : (
  <button
    className="mt-4 px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
    disabled
  >
    Booking Unavailable
  </button>
)}
            

                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Doctor
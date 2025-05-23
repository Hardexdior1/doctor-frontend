// EditDoctorModal.js
import { useState } from "react";
import { MdClose } from "react-icons/md";
import endpointroute from "@/app/utils/endpointroute";
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ handleToggleModal, doctor }) => {
  const [formData, setFormData] = useState({
    name: doctor.name || "",
    email: doctor.email || "",
    specialty: doctor.specialty || "",
    phone: doctor.phone || "",
    bio: doctor.bio || "",
    availableDays: doctor.availableDays || [],
    image: null,
  });

  const [loading, setLoading] = useState(false); 

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, or WebP files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) { 
      alert("File size exceeds 2MB.");
      return;
    }
 setFormData((prev)=>{
    return {...prev,image:file}
 })

}
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

const updatedDoctorData = new FormData();    
    updatedDoctorData.append("name",formData.name)
    updatedDoctorData.append("email",formData.email)
    updatedDoctorData.append("specialty",formData.specialty)
    updatedDoctorData.append("phone",formData.phone)
    updatedDoctorData.append("bio",formData.bio)
    updatedDoctorData.append("availableDays", formData.availableDays); 
    updatedDoctorData.append("image", formData.image);

    

    try {
      const res = await endpointroute.patch(`/edit-doctor/${doctor._id}`, updatedDoctorData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message || "Doctor updated successfully!");

      window.location.reload(); // Reload the page to show updated doctor data

    } catch (error) {
      console.log("Error updating doctor:", error);
      toast.error(error.data.message || "unable to edit doctor ,Something wen wrong!");

    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <ToastContainer />
      
      <div className="bg-white max-h-[700px] overflow-y-scroll p-6 rounded-lg shadow-lg w-4/5 transition-all transform xl:w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-[#207dff] font-bold">Edit Doctor</h2>
          <button onClick={handleToggleModal} className="text-gray-400 hover:text-gray-600">
            <MdClose className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="specialty">
              Specialty
            </label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="bio">
              Bio
            </label>
            <textarea
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleFormChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Available Days</label>
            <div className="flex flex-wrap gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <label key={day} className="flex items-center gap-2">
                  {day}
                  <input
                    type="checkbox"
                    checked={formData.availableDays.includes(day)}
                    onChange={(e) => {
                        const checked=e.target.checked
                            if (checked) {
                              setFormData((prev) => ({
                                ...prev,
                                availableDays: [...prev.availableDays, day],
                              }));
                            }
                            else {
                              setFormData((prev) => ({
                                ...prev,
                                availableDays: prev.availableDays.filter((d) => d !== day),
                              }));
                            }

                    }}
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>
          </div>

        

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="image">
              Image
            </label>
            {doctor.image && (
              <div className="mb-2">
                <Image src={doctor.image} alt="Existing Doctor Image" width={100} height={100} className="rounded-full" />
              </div>
            )}
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading} // Disable button when loading is true
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#207dff] text-white hover:bg-green-700"
              } text-white px-4 py-2 rounded-md transition-colors`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;


"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import endpointroute from "../../utils/endpointroute";
import Image from 'next/image'
const specialtyOptions = [
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'anesthesiology', label: 'Anesthesiology' },
  { value: 'urology', label: 'Urology' },
  { value: 'gynecology', label: 'Gynecology' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'endocrinology', label: 'Endocrinology' },
  { value: 'nephrology', label: 'Nephrology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'rheumatology', label: 'Rheumatology' },
  { value: 'pulmonology', label: 'Pulmonology' },
  { value: 'general', label: 'General Practice' },
];

const DoctorPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  console.log(specialty)
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [availableDays, setAvailableDays] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!name.trim() || !email.trim() || !specialty.trim()) {
      toast.error("Please fill all required fields (Name, Email, Specialty)");
      setLoading(false);
      return;
    }
  
    
  
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("specialty", specialty);
    formData.append("phone", phone);
    formData.append("bio", bio);
    availableDays.forEach(day => formData.append("availableDays[]", day)); 
   formData.append("image", image); // Image file!
  
    try {
      const res = await endpointroute.post("/create-doctor", formData);
  
      toast.success(res.data.message || "Doctor created successfully!");
      console.log(res.data);
  
      setPhone("");
      setEmail("");
      setBio("");
      setSpecialty("");
      setAvailableDays([]); 
      setImage(null);
      setName("")
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!allowedTypes.includes(file.type)) {
    toast.error("Only JPG, PNG, or WebP files are allowed.");
    return;
  }
  if (file.size > 2 * 1024 * 1024) { // 2MB limit
    toast.error("File size exceeds 2MB.");
    return;
  };
setImage(file);
}


  return (

<div className="min-h-screen flex flex-col">
  <ToastContainer />

 

  <div className="flex flex-1">
    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
    <h3 className="text-xl font-semibold text-[#207dff]">Create Doctor Profile</h3>
  </div>
      <form
        className="grid gap-4"
        onSubmit={handleSubmit}
        role="form"
        aria-label="Create doctor profile"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="border px-4 py-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border px-4 py-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="specialty" >Specialty</label>
        <select
  className="border px-4 py-2 rounded w-full"
  value={specialty}
  onChange={(e) => setSpecialty(e.target.value)}
>
  <option value="">Select your specialty</option>
  {specialtyOptions.map((item, index) => (
    <option value={item.value} key={index}>
      {item.label}
    </option>
  ))}
</select>
       

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          placeholder="Phone"
          className="border px-4 py-2 rounded w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          placeholder="Bio"
          className="border px-4 py-2 rounded w-full"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

<label className="block mb-2">Available Days</label>
<div className="flex flex-wrap gap-4">
  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
    <label key={day} className="flex items-center gap-2">
       {day}
      <input
        type="checkbox"
        value={day}
        checked={availableDays.includes(day)}
        onChange={(e) => {
          const checked = e.target.checked;
          setAvailableDays((prev) =>
            checked ? [...prev, day] : prev.filter((d) => d !== day)
          );
        }}
      />
     
    </label>
  ))}
</div>




        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          className="border px-4 py-2 w-full rounded"
          onChange={handleFileChange}
        />

        <button
          type="submit"
          disabled={loading}
          className={`py-2 w-full px-6 rounded text-white ${
            loading ? "bg-blue-400" : "bg-[#207dff] hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Doctor"}
        </button>
      </form>
    </div>

    {/* Side Image */}
    <div className="hidden md:block w-1/2 h-auto">
      <div className="h-full w-full">
        <Image
          src="/doc-1.jpg.webp"
          width={1000}
          height={1000}
          alt="doctor-img"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </div>
</div>

     
  );
};

export default DoctorPage;

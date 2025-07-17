'use client'
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import endpointroute from "@/app/utils/endpointroute";
import { useRouter } from "next/navigation";
export default function UserProfile() {

    const router=useRouter()
    const {user,setUser}=useAuth()

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    // email: "quwam@example.com",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async(e) => {
    e.preventDefault();
    // if(formData.username.trim()!==""&&formData.email.trim()!==""&&formData.password!=="")
    if(formData.username.trim()!=="")
        {
        try {
            const res=await endpointroute.patch('/edit-profile',formData,
                {
                    withCredentials: true,
                }
            )
            
        } catch (error) {
            console.log(error)
        }
        // Call API to save formData here
        setIsEditing(false);
        alert("Profile updated successfully!");
        setUser(null)
        
    }
    else{
        alert('please fill the required form field')


    }

   
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="text-center py-16 text-gray-600">
  <p className="text-2xl font-semibold mb-2">Restricted Access 🔐</p>
  <p className="text-base">
    This profile page is private and only accessible to the account owner.
  </p>
  <p className="text-sm mt-2 text-gray-500">
    If you believe you should have access, please contact the system administrator.
     <b className="mt-4 block">adeniranquwam001@gmail.com</b>
  </p>
</div>

      <div className="flex hidden justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEditing ? "Edit Profile" : "Profile Information"}
        </h2>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="text-sm text-white bg-[#207dff] hover:bg-[#1067d3] px-4 py-2 rounded-md"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <form onSubmit={handleSave} className="hidden space-y-5 bg-white p-6 rounded-xl shadow-md border border-blue-100">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-4 py-2 rounded-md border ${
              isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
        </div>
{/* 
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full px-4 py-2 rounded-md border ${
              isEditing ? "border-blue-300" : "border-gray-200 bg-gray-50 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
        </div> */}

        {isEditing && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Leave blank to keep current password"
            />
          </div>
        )}

        {isEditing && (
          <button
            type="submit"
            className="w-full bg-[#207dff] hover:bg-[#1067d3] text-white py-2 rounded-md"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
}

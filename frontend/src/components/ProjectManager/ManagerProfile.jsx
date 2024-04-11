import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ReactComponent as PersonIcon } from "../../assets/icons/PersonIcon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/PhoneIcon.svg";
import { ReactComponent as EnvelopeIcon } from "../../assets/icons/EnvelopeIcon.svg";

import axiosInstance from "../../axiosintercepter";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
const ManagerProfile = () => {
  const [formData, setFormData] = useState({
    fullname:'',
    phoneNumber:'',
    email:'',
    profilePicture: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
 

  useEffect(() => {
    // Function to fetch user data
    const fetchProfileData = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error("Access token not found");
        }
    
        const response = await axiosInstance.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

setFormData(response.data);
} catch (error) {
console.error("Error fetching user data:", error);
}
};

fetchProfileData();
}, []);// Empty dependency array ensures the effect runs only once after the initial render
console.log("ssss",formData.profilePicture)
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const response = await axiosInstance.put("/user/profileupdate", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data"
      }
    });
    console.log("Profile update response:", response.data);
    toast.success('Profile updated successfully');
    // Optionally, you can display a success message to the user
  } catch (error) {
    console.error("Error updating profile:", error);
    // Handle error, display error message to the user, etc.
  }
};




const handleInputChange = (event) => {
  const newData = { ...formData };

  if (event.target.name === "profilePicture") {
    if (event.target.files.length > 0) {
      newData.profilePicture = event.target.files[0];
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  } else {
    newData[event.target.name] = event.target.value;
  }

  setFormData(newData);
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Profile</h1>
        <ToastContainer />
        <div className="flex flex-col items-center gap-12 sm:flex-row">
          <div className="w-full flex-1 space-y-6">
            <StyledInput
              type="text"
              label="Name"
              placeholder="Name"
              Icon={PersonIcon}
              onChange={handleInputChange}
              name="fullname"
              value={formData.fullname}
            />
            <StyledInput
              type="tel"
              label="Phone Number"
              placeholder="Phone Number"
              Icon={PhoneIcon}
              onChange={handleInputChange}
              name="phoneNumber"
              value={formData.phoneNumber}
            />
            <StyledInput
              type="email"
              label="Email"
              placeholder="email@example.com"
              Icon={EnvelopeIcon}
              onChange={handleInputChange}
              name="email"
              value={formData.email}
            />
          <div className="sm:hidden">
              <h1>Picture</h1>
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src={selectedImage ||formData.profilePicture}
                  alt="Person"
                  className="relative h-32 w-32 rounded-full border object-cover"
                />
                <div>
                  <label
                    htmlFor="pictureInput"
                    className="rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Change
                  </label>
                  <input
                    type="file"
                    id="pictureInput"
                    onChange={handleInputChange}
                    className="hidden"
                    name="profilePicture"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <h1>picture</h1>
            <div className="relative overflow-hidden rounded-full">
              <img
                src={selectedImage ||formData.profilePicture}
                alt="Person"
                style={{ width: 170, height: 170 }}
                className="relative h-24 w-24 rounded-full border object-cover"
              />
              <h1 className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
                <span>Change</span>
                <span className="sr-only">user photo</span>
                <input
                  type="file"
                  className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                  onChange={handleInputChange}
                  name="profilePicture"
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end bg-gray-50 pb-4 sm:px-6 border-t">
        <StyledButton text="Update" />
      </div>
    </form>
  );
};

export default ManagerProfile;
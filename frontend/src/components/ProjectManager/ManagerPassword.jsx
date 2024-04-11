import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ReactComponent as LockClosedIcon } from "../../assets/icons/LockClosedIcon.svg";

import axiosInstance from "../../axiosintercepter";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";

const ManagerPassword = () => {
  const [formData, setFormData] = useState({});

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validate form data...
      if (!validatePassword(formData.newPassword)) {
        throw new Error('Password must meet the criteria: Contains at least 8 characters long, includes at least one uppercase letter, one lowercase letter, one number, and one special character.');
      }

      // Send request to update password
      const response = await axiosInstance.put('/user/passwordupdate', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });
      
      console.log("Password update response:", response.data);
      toast.success('Profile updated successfully');
      // Optionally, display a success message to the user
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.message); // Display error message to the user
      // Handle error, display error message to the user, etc.
    }
  };


  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Password</h1>
        <ToastContainer />
        <div className="flex flex-col gap-12 sm:flex-row sm:items-center">
          <div className="w-full space-y-6">
            <StyledInput
              type="password"
              label="Current Password"
              placeholder="Current Password"
              Icon={LockClosedIcon}
              onChange={handleInputChange}
              name="currentPassword"
            />
             <StyledInput
              type="password"
              label="New Password"
              placeholder="New Password"
              Icon={LockClosedIcon}
              onChange={handleInputChange}
              name="newPassword"
            />
             <StyledInput
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              Icon={LockClosedIcon}
              onChange={handleInputChange}
              name="confirmPassword"
            />
          </div>
          <div className="h-fit w-full max-w-fit rounded-lg border border-amber-400 bg-amber-50 p-6 shadow">
          <h1 className="mb-5 text-xl font-semibold">Password Guidelines</h1>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
          <li>Contains at least 8 characters long</li>
            <li>Includes at least one uppercase letter</li>
            <li>Includes at least one lowercase letter</li>
            <li>Includes at least one number</li>
            <li>Includes at least one special character</li>
          </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-end bg-gray-50 pb-4 sm:px-6 border-t">
<StyledButton text="Update"/>
      </div>
    </form>
  );
};

export default ManagerPassword;

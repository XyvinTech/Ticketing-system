import React, { useState } from "react";
import { ReactComponent as PersonIcon } from "../assets/icons/PersonIcon.svg";
import { ReactComponent as LockClosedIcon } from "../assets/icons/LockClosedIcon.svg";
import Logo from "../assets/Logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as EnvelopeIcon } from "../assets/icons/EnvelopeIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";

import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../ui/GoogleAuth";
import axios from "axios";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";

const RegisterForm = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Form data:", formData);

    // Validate form fields
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Full name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Password confirmation is required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    // Proceed with form submission if no errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:4000/auth/signup', formData);
        
        if (response.status===200) {
          console.log("success",response.data) 
          navigate('/'); 
          toast.success('Successfully registered');
        }
        return response.data;
        
      } catch (error) {
        console.log("error", error); 
        toast.error(error.response.data.message, {
          // Set to 5 seconds
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    
    <div className="flex flex-col justify-center px-5 my-10 mx-auto w-full max-w-[480px]">
      <div className="flex flex-col self-stretch pt-6 pb-8 px-6 py-9 w-full text-sm leading-5  bg-white rounded-md border border border-solid shadow">
        <header className="mb-6">
        <img src={Logo} alt="Logo" className="mx-auto mb-4" />
          <h2 className="text-center text-lg">Register for an account</h2>
        </header>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <StyledInput
            type="text"
            label="Full Name"
            placeholder="John"
            Icon={PersonIcon}
            onChange={handleInputChange}
            name="fullname"
           
          />
          {errors.fullname && <div className="text-red-500">{errors.fullname}</div>}
          <StyledInput
            type="tel"
            label="Phone Number"
            placeholder="0987654323"
            Icon={PhoneIcon}
            onChange={handleInputChange}
            name="phoneNumber"
          />
          {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
          <StyledInput
            type="email"
            label="Email"
            placeholder="email@example.com"
            Icon={EnvelopeIcon}
            onChange={handleInputChange}
            name="email"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
          <StyledInput
            type="password"
            label="Pasword"
            placeholder="********"
            Icon={LockClosedIcon}
            onChange={handleInputChange}
            name="password"
          />
          {errors.password && <div className="text-red-500">{errors.password}</div>}
          <StyledInput
            type="password"
            label="Password Confirmation"
            placeholder="********"
            Icon={LockClosedIcon}
            onChange={handleInputChange}
            name="confirmPassword"
          />
          {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
        </div>
        <StyledButton type="submit" className="mt-8 w-full" text="Register"/>
        </form>
        <div className="mt-3  block text-center">
        or continue with
        </div>
       <GoogleAuth/>
        <div className="mt-1">
          <p className="text-center text-gray-500">
            Already have an account?
            <Link
              to={"/"}
              className="text-purple-600 hover:text-purple-800"
            >
            Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

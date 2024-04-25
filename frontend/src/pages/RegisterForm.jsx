import React from "react";
import { ReactComponent as PersonIcon } from "../assets/icons/PersonIcon.svg";
import { ReactComponent as LockClosedIcon } from "../assets/icons/LockClosedIcon.svg";
import Logo from "../assets/Logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as EnvelopeIcon } from "../assets/icons/EnvelopeIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";

import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className="flex flex-col justify-center px-5 my-10 mx-auto w-full max-w-[480px]">
      <div className="flex flex-col self-stretch pt-6 pb-8 px-6 py-9 w-full text-sm leading-5  bg-white rounded-md border border border-solid shadow">
        <header className="mb-6">
          <img src={Logo} alt="Logo" className="mx-auto mb-4" />
          <h2 className="text-center text-lg">Register for an account</h2>
        </header>
        <ToastContainer />
        <form>
          <div className="space-y-3">
            <StyledInput
              type="text"
              label="Full Name"
              placeholder="John"
              Icon={PersonIcon}
              name="fullname"
            />
            <StyledInput
              type="tel"
              label="Phone Number"
              placeholder="0987654323"
              Icon={PhoneIcon}
              name="phoneNumber"
            />

            <StyledInput
              type="email"
              label="Email"
              placeholder="email@example.com"
              Icon={EnvelopeIcon}
              name="email"
            />

            <StyledInput
              type="password"
              label="Pasword"
              placeholder="********"
              Icon={LockClosedIcon}
              name="password"
            />
            <StyledInput
              type="password"
              label="Password Confirmation"
              placeholder="********"
              Icon={LockClosedIcon}
              name="confirmPassword"
            />
          </div>
          <StyledButton type="submit" className="mt-8 w-full" text="Register" />
        </form>
        <div className="mt-3  block text-center">or continue with</div>
        <div className="mt-1">
          <p className="text-center text-gray-500">
            Already have an account?
            <Link to={"/"} className="text-purple-600 hover:text-purple-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

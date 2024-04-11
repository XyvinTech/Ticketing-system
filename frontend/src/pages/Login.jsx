import React, { useState } from "react";
import { ReactComponent as EnvelopeIcon } from "../assets/icons/EnvelopeIcon.svg";
import { ReactComponent as LockClosedIcon } from "../assets/icons/LockClosedIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StyledInput from "../ui/StyledInput";
import StyledButton from "../ui/StyledButton";
import GoogleAuth from "../ui/GoogleAuth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        setErrorMessage("Email and password are required.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/auth/signin",
        formData
      );
      console.log("Login response:", response);
      const token = response.data.token;
      const userId = response.data._id;
      sessionStorage.setItem("access_token", token);
      console.log("Stored access token:", token);

      sessionStorage.setItem("user_id", userId);
      navigate("/ProjectManager/ManagerProfile");
    } catch (error) {
      console.error("Login error:", error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col justify-center px-5 my-20 mx-auto w-full max-w-[480px]">
      <div className="flex flex-col self-stretch pt-6 px-6 py-9 w-full text-sm leading-5 text-gray-700 bg-white rounded-md border border border-solid shadow">
        <header className="mb-6">
          <img src={Logo} alt="Logo" className="mx-auto mb-4" />
          <h2 className="text-center text-lg">Sign in to your account</h2>
        </header>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <StyledInput
              type="email"
              label="Email"
              placeholder="email@example.com"
              Icon={EnvelopeIcon}
              onChange={handleInputChange}
              name="email"
            />

            <StyledInput
              type="password"
              label="Password"
              placeholder="********"
              Icon={LockClosedIcon}
              onChange={handleInputChange}
              name="password"
            />
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
          </div>
          <StyledButton type="submit" text="Login" className="mt-8 w-full" />
        </form>
        <div className="mt-3  block text-center">or continue with</div>
        <GoogleAuth />

        <div className="mt-1">
          <p className="text-center text-gray-500">
            Don't have an account?
            <Link
              to={"/Register"}
              className="text-purple-600 hover:text-purple-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

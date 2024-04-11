import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { ReactComponent as GoogleIcon } from "../assets/icons/GoogleIcon.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result.user;

      console.log("User's name:", displayName);
      console.log("User's email:", email);

      const response = await axios.post("http://localhost:4000/auth/google", {
        displayName,
        email,
        photoURL,
      });
      console.log("Login response:", response);
      const token = response.data.token;
      const userId = response.data._id;
      sessionStorage.setItem("accss_token", token);
      sessionStorage.setItem("userId", userId);
    } catch (error) {
      console.log("Could not login with Google", error);
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center mt-3 py-2 bg-white rounded border border-solid border-neutral-300"
        onClick={handleGoogleClick}
      >
        <GoogleIcon className="h-5 w-5" />
      </button>
    </>
  );
};

export default GoogleAuth;

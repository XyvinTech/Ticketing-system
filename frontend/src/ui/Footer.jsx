import React from 'react';
import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="p-3 flex flex-col items-center">
      <div className="flex justify-center items-center p-2.5 bg-white rounded-full max-w-[39px]">
        <img src={Logo} alt="Logo" className="w-full aspect-[1.19]" />
      </div>
      <p className="text-center text-sm text-gray-500">
        All rights reserved &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;

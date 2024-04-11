import React from 'react';

const StyledButton = ({ type, text, onClick, className }) => {
  return (
    <button
      type={type}
      className={` rounded-md border border-transparent bg-gradient-to-r from-purple-800 to-blue-600 mt-4 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default StyledButton;

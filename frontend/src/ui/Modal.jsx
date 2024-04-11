import React from "react";


import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
const Modal = ({ closeModal, children }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900"
          onClick={closeModal}
        >
          <CloseIcon className="h-5 w-5"/>
        </button>
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

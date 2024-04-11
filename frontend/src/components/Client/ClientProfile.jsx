import React from "react";
import StyledInput from "../../ui/StyledInput";

import { ReactComponent as PersonIcon } from "../../assets/icons/PersonIcon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/PhoneIcon.svg";
import { ReactComponent as EnvelopeIcon } from "../../assets/icons/EnvelopeIcon.svg";
import StyledButton from "../../ui/StyledButton";
const ClientProfile = () => {
  return (
    <>
      <div className="px-4 py-6 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Profile</h1>
        <div className="flex flex-col items-center gap-12 sm:flex-row">
          <div className="w-full flex-1 space-y-6">
            <StyledInput
              type="text"
              label="Name"
              placeholder="Name"
              Icon={PersonIcon}
            />
            <StyledInput
              type="tel"
              label="Phone Number"
              placeholder="Phone Number"
              Icon={PhoneIcon}
            />
            <StyledInput
              type="email"
              label="Email"
              placeholder="email@example.com"
              Icon={EnvelopeIcon}
            />
            <div className="sm:hidden">
              <h1>Picture</h1>
              <div className="flex flex-wrap items-center gap-3">
                <PersonIcon className="relative h-24 w-24 rounded-full border object-cover" />
                <div>
                  <h4 className="rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700">
                    change
                  </h4>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <h1>picture</h1>
            <div className="relative overflow-hidden rounded-full">
              <PersonIcon className="relative h-40 w-40 rounded-full border object-cover" />
              <h1 className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
                <span>Change</span>
                <span className="sr-only">user photo</span>
                <input
                  type="file"
                  className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end bg-gray-50 pb-4 sm:px-6 border-t">
        <StyledButton text="Update" />
      </div>
    </>
  );
};

export default ClientProfile;

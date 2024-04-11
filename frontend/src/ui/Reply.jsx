import { Disclosure } from "@headlessui/react";
import React from "react";

import { ReactComponent as UpIcon } from "../assets/icons/Upicon.svg";
import StyledText from "../ui/StyledText";
import FileUpload from "../ui/FileUpload";
const Reply = () => {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex w-full items-center justify-between border ${
                open ? "rounded-t-lg" : "rounded-lg"
              } border-b-0 bg-gray-50 px-3  text-left shadow`}
            >
              <h1 className="mb-3 mt-3 text-xl font-semibold">New Reply</h1>

              <UpIcon
                className={`h-5 w-5 text-gray-500 ${
                  open ? "rotate-180 transform" : ""
                }`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="divide-y rounded-b-lg border shadow">
              <div className="space-y-3 px-3 pb-3 pt-6">
                <StyledText  />
                <FileUpload />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Reply;

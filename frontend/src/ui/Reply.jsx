import { Disclosure } from "@headlessui/react";
import React from "react";
import { useForm, Controller } from "react-hook-form"; // Import useForm and Controller
import { ReactComponent as UpIcon } from "../assets/icons/Upicon.svg";
import StyledText from "../ui/StyledText";
import FileUpload from "../ui/FileUpload";
import StyledButton from "./StyledButton";
import { useStore } from "../store/Store";
const Reply = ({ ticketId }) => {
  const { control, handleSubmit } = useForm(); // Initialize form state
  const addConversation = useStore((state) => state.addConversation);
  const onSubmit = async (data) => {
    try {
   
      const newData = { ...data, ticketId: ticketId };
      
      await addConversation(newData);
      console.log("Form data:", newData);
      window.location.reload(); 
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };
  

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3 px-3 pb-3 pt-6">
                 
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <StyledText field={field} />
                    )}
                  />
                    <FileUpload />
                  
                  <div className="flex justify-end">
                    <StyledButton text="Add" type="submit" />
                  </div>
                </div>
              </form>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Reply;

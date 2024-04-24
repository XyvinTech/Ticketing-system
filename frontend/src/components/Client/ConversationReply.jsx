import { Disclosure } from "@headlessui/react";
import React from "react";
import { useForm, Controller } from "react-hook-form"; 
import { ReactComponent as UpIcon } from "../../assets/icons/Upicon.svg";
import StyledText from "../../ui/StyledText";
import FileUpload from "../../ui/FileUpload";
import StyledButton from "../../ui/StyledButton";
import { useConversationStore } from "../../store/ConversationStore";
const ConversationReply = ({ ticketId }) => {
  const { control, handleSubmit } = useForm();
  const addConversation = useConversationStore((state) => state.addConversation);
  const onSubmit = async (data) => {
    try {
      const newData = { ...data, ticketId: ticketId }; 
      const formData = new FormData();
      formData.append("ticketId", newData.ticketId);
      formData.append("message", newData.message);
      newData.attachment.forEach((file) => {
        formData.append("attachment", file);
      });
  
      await addConversation(formData);
      // console.log("Form data:", newData);
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
              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="px-3 pb-3 pt-6">
                 
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <StyledText field={field} />
                    )}
                  />
                 <div className="mt-12">  <Controller
              name="attachment"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange } }) => <FileUpload onChange={onChange} />}
            /></div>   
                    
                 
                  
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

export default ConversationReply;

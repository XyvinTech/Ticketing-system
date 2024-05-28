import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ReactComponent as UpIcon } from "../../assets/icons/Upicon.svg";
import StyledText from "../../ui/StyledText";
import FileUpload from "../../ui/FileUpload";
import StyledButton from "../../ui/StyledButton";
import { useConversationStore } from "../../store/ConversationStore";
import { uploadImage } from "../../api/uploadapi";
import Spinner from "../../ui/Spinner";
const ProjectLeadConversation = ({ ticketId, isChange, setIsChange }) => {
  const { control, handleSubmit, reset } = useForm();
  const { addConversation } = useConversationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    data.ticketId = ticketId;

    if (data.attachment.length > 0) {
      const imageUrl = await uploadImage(data.attachment);
      data.attachment = imageUrl.data.map((dataUrl) => dataUrl.url);
    }

    try {
      await addConversation(data);
      setIsChange(!isChange);
      reset();
    } catch (error) {
      console.error("Error", error);
      toast.error("Error!");
    }
    finally {
      setIsSubmitting(false);
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="px-3 pb-3 pt-6">
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => <StyledText field={field} />}
                  />
                  <div className="mt-12">
                    {" "}
                    <Controller
                      name="attachment"
                      control={control}
                      defaultValue={[]}
                      render={({ field: { onChange } }) => (
                        <FileUpload onChange={onChange} />
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <StyledButton
                      text={isSubmitting ? <Spinner /> : "Add"}
                      type="submit"
                      disabled={isSubmitting}
                    />
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

export default ProjectLeadConversation;

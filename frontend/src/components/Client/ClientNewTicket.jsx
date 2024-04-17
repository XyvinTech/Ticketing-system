import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledSelectionList from "../../ui/StyledSelectionList";
import StyledInput from "../../ui/StyledInput";
import StyledText from "../../ui/StyledText";
import FileUpload from "../../ui/FileUpload";
import StyledButton from "../../ui/StyledButton";
import { useStore } from "../../store/Store";
const ClientNewTicket = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addTicket = useStore((state) => state.addTicket);
  const Priority = [
    { name: "Select a priority" },
    { name: "Low" },
    { name: "Medium" },
    { name: "High" },
  ];
  const Category = [
    { name: "Select a category" },
    { name: "Hardware Issue" },
    { name: "Software Issue" },
    { name: "Other" },
  ];

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("priority", data.priority);
      formData.append("category", data.category);
      formData.append("subject", data.subject);
      formData.append("description", data.description);
      data.attachment.forEach((file) => {
        formData.append("attachment", file);
      });
  
      await addTicket(formData);
      toast.success("Ticket created successfully!");
      console.log(data);
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };
  

  return (
    <>
    <div className="divide-y divide-gray-200">
    <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <h1 className="mb-6 text-xl font-semibold">New Ticket</h1>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Controller
                  name="priority"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledSelectionList
                        label="Priority"
                        options={Priority}
                        {...field}
                      />
                      {errors.priority && (
                        <span className="text-red-500">
                          {errors.priority.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Priority is required" }}
                />
              </div>
              <div>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledSelectionList
                        label="Category"
                        options={Category}
                        {...field}
                      />
                      {errors.category && (
                        <span className="text-red-500">
                          {errors.category.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Category is required" }}
                />
              </div>
            </div>
            <div>
              <Controller
                name="subject"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledInput
                    type="text"
                    label="Subject"
                    placeholder="Subject"
                    {...field}
                  />
                )}
                rules={{ required: "Subject is required" }}
              />
              {errors.subject && (
                <span className="text-red-500">{errors.subject.message}</span>
              )}
            </div>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <StyledText label="Description" field={field} />}
              rules={{ required: "Description is required" }}
            />
           
          </div> 
          <div className="mt-14">{errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
            <Controller
              name="attachment"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange } }) => <FileUpload onChange={onChange} />}
            />
          </div>
        </div>
        <div className="flex justify-end bg-gray-50 pb-4 sm:px-6">
          <StyledButton text="Create" type="submit" />
        </div>
      </form>
    </div>
  </>
  
  );
};

export default ClientNewTicket;

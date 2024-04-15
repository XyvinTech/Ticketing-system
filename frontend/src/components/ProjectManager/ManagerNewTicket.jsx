import React from "react";
import { useForm, Controller } from "react-hook-form";
import StyledSelectionList from "../../ui/StyledSelectionList";
import StyledInput from "../../ui/StyledInput";
import StyledText from "../../ui/StyledText";
import FileUpload from "../../ui/FileUpload";
import StyledButton from "../../ui/StyledButton";

const ManagerNewTicket = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

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

  const onSubmit = (data) => {
    console.log(data); // Ensure data is logged properly
  };

  return (
    <>
      <div className="divide-y divide-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 px-4 sm:p-6 lg:pb-8">
            <h1 className="mb-6 text-xl font-semibold">New Ticket</h1>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Controller
                  name="priority"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledSelectionList
                      label="Priority"
                      options={Priority}
                      {...field}
                    />
                  )}
                  rules={{ required: "Priority is required" }}
                />
                {errors.priority && <span className="text-red-500">{errors.priority.message}</span>}
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledSelectionList
                      label="Category"
                      options={Category}
                      {...field}
                    />
                  )}
                  rules={{ required: "Category is required" }}
                />
                {errors.category && <span className="text-red-500">{errors.category.message}</span>}
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
                {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
              </div>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledText
                    label="Description"
                    control={control} // pass control prop
                    name="description" // pass name prop
                  />
                )}
                rules={{ required: "Description is required" }}
              />
              {errors.description && <span className="text-red-500">{errors.description.message}</span>}
              <FileUpload control={control} name="files" />
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

export default ManagerNewTicket;

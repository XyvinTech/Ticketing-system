import React from "react";
import StyledSelectionList from "../../ui/StyledSelectionList";
import StyledInput from "../../ui/StyledInput";
import StyledText from "../../ui/StyledText";
import FileUpload from "../../ui/FileUpload";
import StyledButton from "../../ui/StyledButton";

const ManagerNewTicket = () => {
  const Priority = [
    { name: "Select a prority" },
    { name: "Low" },
    { name: "Medium" },
    { name: "High" },
  ];
  const Category = [
    { name: "Select a Catigory" },
    { name: "Hardware Issue" },
    { name: "Medium" },
    { name: "High" },
  ];
  return (
    <>
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <h1 className="mb-6 text-xl font-semibold">New Ticket</h1>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <StyledSelectionList label="Priority" options={Priority} />
              <StyledSelectionList label="Category" options={Category} />
            </div>
            <div>
              <StyledInput
              type="text"
              label="Subject"
              placeholder="Subject"
              />  
            </div>
<StyledText label="Description"/>
<FileUpload/>
          </div>
        </div>
        <div className="flex justify-end bg-gray-50 pb-4 sm:px-6">
      <StyledButton  text="Create"  />
    </div>
    </>
  );
};

export default ManagerNewTicket;

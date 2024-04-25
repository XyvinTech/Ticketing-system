import React, { useState } from "react";
import Modal from "../../ui/Modal";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import StyledSearch from "../../ui/StyledSearch";

const AdminAddProject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailOptions = [
    { value: 'email1@example.com', label: 'email1@example.com' },
    { value: 'email2@example.com', label: 'email2@example.com' },
    { value: 'email3@example.com', label: 'email3@example.com' },
    { value: 'email4@example.com', label: 'email4@example.com' },
  ];
  const people = [
    { id: 1, ProjectName: "Account System", projectManager: "john@example.com" },
    {
      id: 2,
      ProjectName: "Ecommerce System",
      projectManager: "jane@example.com",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <h1 className="text-xl font-semibold">Projects</h1>

      <div className="mb-4 pr-5 flex justify-between items-center">
        <div className="flex mt-5 gap-3 divide-x divide-dashed text-sm text-gray-500">
          <div className="font-semibold">All(2)</div>
        </div>
        <StyledButton text="Add Project" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="flex-auto font-semibold">Add Project</h1>

            <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
              project Name
            </h1>
            <Controller
              name="projectName"
              control={control}
              defaultValue=""
              render={({ field }) => <StyledInput type="text" {...field} />}
              rules={{ required: "Project Name is required" }}
            />
            {errors.projectName && (
              <span className="text-red-500">{errors.projectName.message}</span>
            )}
 <h1 className="mt-4 mb-1 text-xs font-semibold leading-4 text-slate-500">
              project Manager
            </h1>
<Controller
              name="projectManager"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledSearch
                    listname="User Type"
                    options={emailOptions}
                    {...field}
                  />
                  {errors.projectManager&& (
                    <span className="text-red-500">
                      {errors.projectManager.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Project Manager is required" }}
            />
            <div className="flex  justify-end gap-4">
              <button
                className="font-semibold  mt-3"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <StyledButton text="Add" type="submit" />
            </div>
          </form>
        </Modal>
      )}
      <div className="overflow-x-auto rounded-lg border shadow">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <td
                    colSpan="4"
                    className="px-3 py-3 text-left text-sm text-gray-900"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 max-md:flex-wrap items-center">
                      <div className="flex-grow lg:w-20 max-w-xs">
                        <StyledInput placeholder="Search " Icon={SearchIcon} />
                      </div>

                      <div className="flex flex-grow ml-0 sm:ml-28 gap-3 sm:flex sm:flex-wrap sm:justify-start">
                        <div className="flex overflow-hidden relative flex-col justify-center w-full sm:w-auto">
                          <button className="h-9 w-full sm:w-32 relative shrink-0 bg-white rounded-md border border-gray-300 border-solid">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="font-semibold  text-sm  text-gray-900">
                  <td className="px-3 py-3 ">Name</td>
                  <td className="px-3 py-3  ">Project Manager</td>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr
                    key={person.id}
                    className=" mb-2 border-b border-gray-200 text-left"
                  >
                    <td className="px-3 py-4  text-sm text-gray-900">
                      <input type="checkbox" class="mr-2  accent-purple-500" />{" "}
                      {person.ProjectName}
                    </td>
                    <td className="px-3 py-3  text-sm text-gray-900">
                      {person.projectManager}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProject;

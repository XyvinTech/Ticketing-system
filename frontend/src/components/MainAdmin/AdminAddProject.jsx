import React, { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as MenuIcon } from "../../assets/icons/MenuVerticalIcon.svg";

import { useProjectStore } from "../../store/projectStore";
import { toast } from "react-toastify";
import { Menu } from "@headlessui/react";
import { useDepartmentStore } from "../../store/DepartmentStore";
import StyledSearch from "../../ui/StyledSearch";
import StyledSelectionList from "../../ui/StyledSelectionList";
import DropDown from "../../ui/DropDown";
const AdminAddProject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const { projects, fetchProject, addProject, deleteProject, updateProject } =
    useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [search, setSearch] = useState();
  const [editedProject, setEditedProject] = useState(null);
  const { departments, fetchDepartment } = useDepartmentStore();
  const [dep, setDep] = useState();
  useEffect(() => {
    if (editedProject) {
      setValue("projectName", editedProject.projectName);
    } else {
      reset();
    }
  }, [editedProject, setValue, reset]);
  useEffect(() => {
    let filter = {};
    if (search) {
      filter.searchQuery = search;
    }
    if (dep && dep !== "all") {
      filter.inDep = dep;
    }
    fetchProject(filter);
  }, [isChange, search,dep]);
  useEffect(() => {
    fetchDepartment();
  }, []);
  const options = departments.map((project) => ({
    value: project._id,
    name: project.departmentName,
  }));
  const Manager = [
    { value: "all", name: "All" },, // Adding the "All" option
    ...departments.map((project) => ({
      value: project._id,
      name: project.departmentName,
    })),
  ];
  const onSubmit = async (data) => {
    try {
      if (editedProject) {
        // Update existing project
        // Implement updateProject function in useProjectStore
        console.log("updated data", data);
        await updateProject(editedProject._id, data);
        toast.success("Project updated successfully!");
      } else {
        await addProject(data);
      }

      setIsChange(!isChange);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully!");
      setIsChange(!isChange);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <h1 className="text-xl font-semibold">Projects</h1>
      <div className="mb-4 pr-5 flex justify-between items-center">
        <div className="flex mt-5 gap-3 divide-x divide-dashed text-sm text-gray-500">
          <div className="font-semibold">All({projects.length})</div>
        </div>
        <StyledButton text="Add Project" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal
          closeModal={() => {
            setEditedProject(null);
            setIsModalOpen(false);
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="flex-auto font-semibold">
              {editedProject ? "Edit Project" : "Add Project"}
            </h1>

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
              Department
            </h1>
            <Controller
              name="departmentId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledSelectionList
                    listname="Department"
                    options={options}
                    selectedOption={
                      editedProject
                        ? {
                            value: editedProject?.departmentId?._id,
                            name: editedProject?.departmentId?.departmentName,
                          }
                        : null
                    }
                    {...field}
                  />
                  {errors.departmentId && (
                    <span className="text-red-500">
                      {errors.departmentId.message}
                    </span>
                  )}
                </>
              )}
            />
            <div className="flex  justify-end gap-4">
              <button
                className="font-semibold  mt-3"
                onClick={() => {
                  setEditedProject(null);
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
              <StyledButton
                text={editedProject ? "Update" : "Add"}
                type="submit"
              />
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
                        <StyledInput
                          placeholder="Search "
                          Icon={SearchIcon}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <DropDown label="All" options={Manager}
             onChange={(value) => setDep(value)} />
                    </div>
                  </td>
                </tr>

                <tr className="font-semibold  text-sm text-left text-gray-900">
                  <td className="px-3 py-3 ">Name</td>
                  <td className="px-3 py-3 ">Department</td>
                  <td className="px-3 py-3  ">Action</td>
                </tr>
              </thead>
              <tbody>
                {projects && projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project?._id} className="border-b border-gray-200">
                      <td className="px-3 py-4 text-left text-sm text-gray-900">
                        {project?.projectName}
                      </td>
                      <td className="px-3 py-4 text-left text-sm text-gray-900">
                        {project?.departmentId?.departmentName}
                      </td>
                      <td className="px-3 py-3 text-left text-sm text-gray-900 ">
                        <Menu>
                          <Menu.Button className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <MenuIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                          </Menu.Button>

                          <Menu.Items className="absolute right-0 sm:right-auto w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-700"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={() => {
                                      setEditedProject(project);
                                      setIsModalOpen(true);
                                    }}
                                  >
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-700"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={() =>
                                      handleDeleteProject(project?._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Menu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-3 py-4 text-left text-sm text-gray-900"
                    >
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProject;

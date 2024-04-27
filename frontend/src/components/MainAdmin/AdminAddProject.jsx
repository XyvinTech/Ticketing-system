import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../ui/Modal";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as DeleteIcon } from "../../assets/icons/DeleteIcon.svg";
import { useProjectStore } from "../../store/projectStore";
const AdminAddProject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { projects, fetchProject, addProject,deleteProject } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [search, setSearch] = useState();
  useEffect(() => {
    let filter={};
    if(search){
      filter.searchQuery=search;
    }
    fetchProject(filter);
  }, [isChange,search]);
  const onSubmit = async (data) => {
    try {
      await addProject(data);
      setIsChange(!isChange);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  console.log("All Projects:", projects);

  const handleDeleteProject = async(projectId) => {
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
          <div className="font-semibold">All(2)</div>
        </div>
        <StyledButton text="Add Project" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="flex-auto font-semibold">Add Project</h1>

            <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">project Name</h1>
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

            <div className="flex  justify-end gap-4">
              <button className="font-semibold  mt-3" onClick={() => setIsModalOpen(false)}>
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
                  <td colSpan="4" className="px-3 py-3 text-left text-sm text-gray-900">
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 max-md:flex-wrap items-center">
                      <div className="flex-grow lg:w-20 max-w-xs">
                        <StyledInput placeholder="Search " Icon={SearchIcon}  onChange={(e) => setSearch(e.target.value)} />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="font-semibold  text-sm text-left text-gray-900">
                  <td className="px-3 py-3 ">Name</td>
                  <td className="px-3 py-3  ">Delete</td>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} className="border-b border-gray-200">
                    <td className="px-3 py-4 text-left text-sm text-gray-900">
                      {project.projectName}
                    </td>
                    <td className="px-3 py-3">
                      <button onClick={() => handleDeleteProject(project._id)}>
                        <DeleteIcon className="h-5 w-5 text-gray-500" />
                      </button>
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

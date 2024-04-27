import React, { useEffect, useState } from "react";
import StyledSelectionList from "../../ui/StyledSelectionList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../ui/Modal";
import { ReactComponent as PersonIcon } from "../../assets/icons/PersonIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/PhoneIcon.svg";
import { ReactComponent as LockClosedIcon } from "../../assets/icons/LockClosedIcon.svg";
import { ReactComponent as EnvelopeIcon } from "../../assets/icons/EnvelopeIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/DeleteIcon.svg";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import StyledMultipleSelection from "../../ui/StyledMultipleSelection";
import { useProjectStore } from "../../store/projectStore";
import { useUserStore } from "../../store/UserStore";

const AdminAddUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { projects, fetchProject } = useProjectStore();
  const [isChange, setIsChange] = useState(false); // State for modal
  const { users, fetchUser, addUser, deleteUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [isChange]);
  useEffect(() => {
    fetchProject();
  }, []);
  const selectOptions = projects.map((project) => ({
    value: project._id,
    label: project.projectName,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const Role = [
    { value: "projectManager", name: "Project Manager" },
    { value: "projectLead", name: "Project Lead" },
    { value: "member", name: "Member" },
  ];
  const onSubmit = async (data) => {
    try {
      await addUser(data);
      toast.success("User Added successfully!");
      setIsChange(!isChange);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully!");
      setIsChange(!isChange);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <h1 className="text-xl font-semibold">Users</h1>

      <div className="mb-4 pr-5 flex justify-between items-center">
        <div className="flex mt-5 gap-3 divide-x divide-dashed text-sm text-gray-500">
          <div className="font-semibold">All(2)</div>
        </div>
        <StyledButton text="Add User" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="flex-auto font-semibold">Add User</h1>

            <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
              User Name
            </h1>
            <Controller
              name="userName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput
                  type="text"
                  Icon={PersonIcon}
                  placeholder="John"
                  {...field}
                />
              )}
              rules={{ required: "User Name is required" }}
            />
            {errors.userName && (
              <span className="text-red-500">{errors.userName.message}</span>
            )}

            <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">
              Phone Number
            </h1>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput
                  type="tel"
                  placeholder="0987654323"
                  Icon={PhoneIcon}
                  {...field}
                />
              )}
              rules={{ required: "Phone Number is required" }}
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber.message}</span>
            )}
            <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">
              Email
            </h1>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput
                  type="email"
                  placeholder="email@example.com"
                  Icon={EnvelopeIcon}
                  {...field}
                />
              )}
              rules={{ required: "Email is required" }}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">
              Password
            </h1>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput
                  type="password"
                  placeholder="********"
                  Icon={LockClosedIcon}
                  {...field}
                />
              )}
              rules={{ required: "Password is required" }}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">
              User Type
            </h1>
            <Controller
              name="usertype"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledSelectionList
                    listname="User Type"
                    options={Role}
                    {...field}
                  />
                  {errors.usertype && (
                    <span className="text-red-500">
                      {errors.usertype.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "UserType is required" }}
            />

            <h1 className="mt-5 mb-1 text-xs font-semibold leading-4 text-slate-500">
              Project Name
            </h1>
            <Controller
              name="projectId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledMultipleSelection options={selectOptions} {...field} />
                  {errors.projectId && (
                    <span className="text-red-500">
                      {errors.projectId.message}
                    </span>
                  )}
                </>
              )}
              rules={{ required: "Project name is required" }}
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
                        <StyledInput
                          placeholder="Search for names, groups or email"
                          Icon={SearchIcon}
                        />
                      </div>
                      <div>
                        <StyledSelectionList listname="Roles" options={Role} />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="font-semibold  text-left text-sm  text-gray-900">
                  <td className="px-3 py-3 ">Name</td>
                  <td className="px-3 py-3  ">Email</td>
                  <td className="px-3 py-3   ">User Type</td>
                  <td className="px-3 py-3   ">Delete</td>
                </tr>
              </thead>
              <tbody>
                {users.map((person) => (
                  <tr
                    key={person._id}
                    className="mb-2 border-b  border-gray-200"
                  >
                    <td className="px-3 py-4 text-sm text-gray-900 text-left">
                      {person.userName}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900 text-left">
                      {person.email}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900 text-left">
                      {person.usertype === "projectManager"
                        ? "Project Manager"
                        : person.usertype === "member"
                        ? "Member"
                        : person.usertype === "lead"
                        ? "Lead"
                        : person.usertype === "client"
                        ? "Client"
                        : "Unknown"}
                    </td>

                    <td className="px-3 py-3 text-sm text-gray-900 text-left">
                      <DeleteIcon
                        className="h-5 w-5"
                        onClick={() => handleDeleteUser(person._id)}
                      />
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

export default AdminAddUser;

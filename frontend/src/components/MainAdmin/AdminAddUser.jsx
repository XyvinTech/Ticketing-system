import React, { useEffect, useState } from "react";
import StyledSelectionList from "../../ui/StyledSelectionList";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";
import { ReactComponent as PersonIcon } from "../../assets/icons/PersonIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/PhoneIcon.svg";
import { ReactComponent as LockClosedIcon } from "../../assets/icons/LockClosedIcon.svg";
import { ReactComponent as EnvelopeIcon } from "../../assets/icons/EnvelopeIcon.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/MenuVerticalIcon.svg";

import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import StyledMultipleSelection from "../../ui/StyledMultipleSelection";
import { useProjectStore } from "../../store/projectStore";
import { useUserStore } from "../../store/UserStore";
import { Menu } from "@headlessui/react";
import { useDepartmentStore } from "../../store/DepartmentStore";

const AdminAddUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { projects, fetchProject } = useProjectStore();
  const { users, fetchUser, addUser, deleteUser, updateUser } = useUserStore();
  const [isChange, setIsChange] = useState(false);

  const [search, setSearch] = useState();
  const [role, setRole] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [dep, setDep] = useState("");
  const { departments, fetchDepartment } = useDepartmentStore();
  useEffect(() => {
    let filter = {};
    if (search) {
      filter.searchQuery = search;
    }
    if (role && role !== "all") {
      filter.usertype = role;
    }
    fetchUser(filter);
  }, [isChange, search, role]);
  // console.log("users", departments);
  useEffect(() => {
    let filter = {};
    if (dep) {
      filter.inDep = dep;
    }

    fetchProject(filter);
  }, [dep]);
  // console.log("selectedUserType", selectedUserType);
  useEffect(() => {
    let filter = {};
    if (selectedUserType) {
      filter.withDep = selectedUserType;
    }
    fetchDepartment(filter);
  }, [selectedUserType]);

  useEffect(() => {
    if (editedUser) {
      if (editedUser.usertype === "manager") {
        setSelectedUserType("manager");
        setDep(editedUser.department[0]);
      } else {
        setSelectedUserType("");
      }

      setValue("userName", editedUser.userName);
      setValue("email", editedUser.email);
      setValue("phoneNumber", editedUser.phoneNumber);
      setValue("usertype", editedUser.usertype);
      setValue("department", editedUser.department[0]?.departmentName);
      setValue(
        "projectId",
        editedUser.projectId.map((project) => project._id)
      );
    } else {
      reset();
    }
  }, [editedUser, setValue, reset]);

  const selectOptions = projects.map((project) => ({
    value: project._id,
    label: project.projectName,
  }));
  // console.log("selectedOption", selectOptions);
  const Role = [
    { value: "all", name: "All" },
    { value: "manager", name: "Manager" },
    { value: "projectLead", name: "Project Lead" },
    { value: "member", name: "Member" },
    { value: "client", name: "Client" },
  ];
  const Roles = [
    { value: "manager", name: "Manager" },
    { value: "projectLead", name: "Project Lead" },
    { value: "member", name: "Member" },
    { value: "client", name: "Client" },
  ];
  const onSubmit = async (data) => {
    try {
      if (editedUser) {
        // console.log("updated data", data);
        const response = await updateUser(editedUser._id, data);
        if (response) {
          toast.success("Updated successfully!");
        }
      } else {
        await addUser(data);
        reset();
      }

      setIsChange(!isChange);
      setSelectedUserType("");
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const options = departments.map((project) => ({
    value: project._id,
    name: project.departmentName,
  }));
  // console.log("dep",options)
  const handleDeleteUser = async (userId) => {
    try {
      const data = await deleteUser(userId);
      if (data) {
        toast.success("User deleted successfully!");
      }

      setIsChange(!isChange);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  useEffect(() => {
    if (selectedUserType === "manager") {
      setDep(editedUser ? editedUser.department[0] : "");
    } else {
      setDep("");
    }
  }, [selectedUserType, editedUser]);

  // console.log("Dep", selectedUserType);
  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <h1 className="text-xl font-semibold">Users</h1>

      <div className="mb-4 pr-5 flex justify-between items-center">
        <div className="flex mt-5 gap-3 divide-x divide-dashed text-sm text-gray-500">
          <div className="font-semibold">All({users?.length})</div>
        </div>
        <StyledButton text="Add User" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal
          closeModal={() => {
            setEditedUser(null);
            setIsModalOpen(false);
            setSelectedUserType(null);
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="flex-auto font-semibold">
              {" "}
              {editedUser ? "Edit User" : "Add User"}
            </h1>

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
            {!editedUser && (
              <>
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
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </>
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
                    options={Roles}
                    selectedOption={
                      editedUser
                        ? {
                            value: editedUser.usertype,
                            name: editedUser.usertype,
                          }
                        : null
                    }
                    {...field}
                    onChange={(value) => {
                      setSelectedUserType(value);
                      field.onChange(value);
                    }}
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

            { selectedUserType === "manager" ? (
              <>
                <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">
                  Department
                </h1>
                <Controller
                  name="department"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledSelectionList
                        listname="Department"
                        options={options}
                        selectedOption={
                          editedUser
                            ? {
                                value: editedUser?.department[0]?._id,
                                name: editedUser?.department[0]?.departmentName,
                              }
                            : {}
                        }
                        {...field}
                        onChange={(value) => {
                          setDep(value); // Set selected user type inline
                          field.onChange(value);
                        }}
                      />
                      {errors.department && (
                        <span className="text-red-500">
                          {errors.department.message}
                        </span>
                      )}
                    </>
                  )}
                  rules={{ required: "Department is required" }}
                />
              </>
            ) : null}
            {selectOptions.length > 0 &&
              (dep || selectedUserType !== "manager") && (
                <>
                  <h1 className="mt-5 mb-1 text-xs font-semibold leading-4 text-slate-500">
                    Project Name
                  </h1>
                  <Controller
                    name="projectId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledMultipleSelection
                          options={selectOptions}
                          initialValues={
                            editedUser
                              ? editedUser.projectId.map((project) => ({
                                  value: project._id,
                                  label: project.projectName,
                                }))
                              : []
                          }
                          {...field}
                        />

                        {errors.projectId && (
                          <span className="text-red-500">
                            {errors.projectId.message}
                          </span>
                        )}
                      </>
                    )}
                    // rules={{ required: "Project name is required" }}
                  />
                </>
              )}
      {(!selectOptions.length && (dep || selectedUserType !== "manager")) && (
  <p className="text-red-500">This department currently has no projects.</p>
)}



            <div className="flex  justify-end gap-4">
              <button
                className="font-semibold  mt-3"
                onClick={() => {
                  setEditedUser(null);
                  setIsModalOpen(false);
                  setSelectedUserType(null);
                }}
              >
                Cancel
              </button>
              <StyledButton
                text={editedUser ? "Update" : "Add"}
                type="submit"
              />
            </div>
          </form>
        </Modal>
      )}
      <div className="overflow-x-auto rounded-lg border shadow ">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <td
                    colSpan="4"
                    className="px-3 py-3 pb-10 text-left text-sm text-gray-900"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 max-md:flex-wrap items-center">
                      <div className="flex-grow lg:w-20 max-w-xs">
                        <StyledInput
                          placeholder="Search for names or email"
                          Icon={SearchIcon}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div>
                        <StyledSelectionList
                          listname="Roles"
                          onChange={(value) => setRole(value)}
                          options={Role}
                        />
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="font-semibold  text-left text-sm  text-gray-900">
                  <td className="px-3 py-3 pt-5">Name</td>
                  <td className="px-3 py-3 pt-5 ">Email</td>
                  <td className="px-3 py-3  pt-5 ">User Type</td>
                  <td className="px-3 py-3  pt-5 ">Projects</td>
                  <td className="px-3 py-3  pt-5 ">Action</td>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="pt-7 pb-7 text-sm text-red-500 text-center"
                    >
                      No Users
                    </td>
                  </tr>
                ) : (
                  Array.isArray(users) &&
                  users.map(
                    (person) =>
                      person?.usertype !== "admin" && (
                        <tr
                          key={person?._id}
                          className="mb-2 border-b  border-gray-200"
                        >
                          <td className="px-3 py-4 text-sm text-gray-900 text-left">
                            {person?.userName}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 text-left">
                            {person?.email}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 text-left">
                            {person?.usertype === "manager"
                              ? "Manager"
                              : person?.usertype === "member"
                              ? "Member"
                              : person?.usertype === "projectLead"
                              ? "Project Lead"
                              : person?.usertype === "client"
                              ? "Client"
                              : "Unknown"}
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-900 text-left">
                            {person?.projectId?.map((project, index) => (
                              <span key={project._id}>
                                {project.projectName}
                                {index !== person.projectId.length - 1 && ","}
                              </span>
                            ))}
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
                                          setEditedUser(person);
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
                                          handleDeleteUser(person?._id)
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
                          {/* <td className="px-3 py-3 text-sm text-gray-900 text-left">
                            <DeleteIcon
                              className="h-5 w-5"
                              onClick={() => handleDeleteUser(person?._id)}
                            />
                          </td> */}
                        </tr>
                      )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddUser;

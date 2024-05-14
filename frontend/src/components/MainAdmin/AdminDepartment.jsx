import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { ReactComponent as UpDownIcon } from "../../assets/icons/UpDownIcon.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/MenuVerticalIcon.svg";

import { ReactComponent as PlusIcon } from "../../assets/icons/PlusIcon.svg";
import StyledText from "../../ui/StyledText";
import { useDepartmentStore } from "../../store/DepartmentStore";
import { useUserStore } from "../../store/UserStore";
import StyledMultipleSelection from "../../ui/StyledMultipleSelection";
import { Menu } from "@headlessui/react";
import { updateDepartment } from "../../api/departmentapi";

const AdminDepartment = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const {
    departments,
    fetchDepartment,
    addDepartment,
    deleteDepartment,
    editDepartment,
  } = useDepartmentStore();
  const { users, fetchUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isAssignOpen, setisAssignOpen] = useState(false);
  const [departmentId, setDepartmentId] = useState();
  const [expandedRows, setExpandedRows] = useState({});
  const [editedDepartment, setEditedDepartment] = useState(null);
  useEffect(() => {
    fetchDepartment();
  }, [isChange]);
  // console.log("dp", departments);
  useEffect(() => {
    let filter = {};
    filter.inLead = true;
    fetchUser(filter);
  }, []);
  // console.log("department", editedDepartment);
  useEffect(() => {
    if (editedDepartment) {
      // If editedProject is not null, set form field values
      setValue("departmentName", editedDepartment.departmentName);
      setValue("description", editedDepartment.description);
      // setValue("members", editedDepartment.members);
    } else {
      reset();
    }
  }, [editedDepartment, setValue, reset]);
  const selectOptions =
    users && Array.isArray(users)
      ? users.map((user) => ({
          value: user?._id,
          label: user?.email,
          // Add user type as note
          note: user?.usertype,
        }))
      : [];

  const handleExpand = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const onSubmit = async (data) => {
    try {
      if (editedDepartment) {
        // console.log("updated data", data);
        await editDepartment(editedDepartment._id, data);
        toast.success("Updated successfully!");
      } else {
        await addDepartment(data);
        reset();
      }
      setIsChange(!isChange);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };
  const handleUpdateUser = async (data, departmentId, action) => {
    try {
      let filter = { action: action };
      await updateDepartment(data, departmentId, filter);

      toast.success("Updated successfully!");
      setIsChange(!isChange);
      setisAssignOpen(false);
    } catch (error) {
      console.error("Error adding :", error);
    }
  };
  const handleDelete = async (departmentId) => {
    try {
      await deleteDepartment(departmentId);
      toast.success("User deleted successfully!");
      setIsChange(!isChange);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <h1 className="text-xl font-semibold">Department</h1>

      <div className="mb-4 pr-5 flex justify-between items-center">
        <div className="flex mt-5 gap-3 divide-x divide-dashed text-sm text-gray-500">
          <div className="font-semibold">All({departments.length})</div>
        </div>
        <StyledButton text="Add Group" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal
          closeModal={() => {
            setEditedDepartment(null);
            setIsModalOpen(false);
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="flex-auto font-semibold">
              {editedDepartment ? "Edit Department" : "New Department"}
            </h1>

            <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
              Title
            </h1>
            <Controller
              name="departmentName"
              control={control}
              defaultValue=""
              render={({ field }) => <StyledInput type="text" {...field} />}
              rules={{ required: "Department Name is required" }}
            />
            {errors.departmentName && (
              <span className="text-red-500">
                {errors.departmentName.message}
              </span>
            )}
            {/* <h1 className="mt-4 mb-1 text-xs font-semibold leading-4 text-slate-500">
               Manager
            </h1>
            <Controller
              name="departmentManager"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledSelectionList
                    listname="Manager"
                    options={options}
                    selectedOption={
                      editedDepartment
                        ? {
                            value: editedDepartment?.departmentManager?._id,
                            name: editedDepartment?.departmentManager?.email,
                          }
                        : null
                    }
                    {...field}
                  />
                  {errors.departmentManager && (
                    <span className="text-red-500">
                      {errors.departmentManager.message}
                    </span>
                  )}
                </>
              )}
            /> */}
            <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
              Description
            </h1>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <StyledText field={field} />}
              rules={{ required: "Description is required" }}
            />

            <div className="flex mt-12  justify-start gap-4">
              <button
                className="font-semibold  mt-3"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditedDepartment(null);
                }}
              >
                Cancel
              </button>
              <StyledButton text="save" type="submit" />
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
                  ></td>
                </tr>

                <tr className="text-left font-semibold  text-sm  text-gray-900">
                  <td className="px-3 py-3 ">Name</td>
                  <td className="px-3 py-3  ">Department Manager</td>
                  <td className="px-3 py-3  ">Members</td>{" "}
                  <td className="px-3 py-3  ">Action</td>
                  <td className="px-3 py-3  "></td>
                </tr>
              </thead>
              <tbody>
                {departments && departments.length > 0 ? (
                  departments.map((user, index) => (
                    <tr key={index} className="mb-2 border-b border-gray-200">
                      <td className="px-3 py-4 text-left text-sm text-gray-900">
                        {/* <input
                          type="checkbox"
                          className="mr-2 accent-purple-500"
                        /> */}
                        {user?.departmentName}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-900 text-left">
                        {user?.departmentManager
                          ? user.departmentManager
                              .map((manager) => manager.userName)
                              .join(", ")
                          : ""}
                      </td>

                      <td className="text-sm text-gray-900">
                        <div className="flex flex-wrap">
                          {user?.members &&
                            user.members
                              .slice(0, 3)
                              .map((member, memberIndex) => (
                                <div
                                  key={memberIndex}
                                  className="flex mb-2 mr-2"
                                >
                                  <div className="flex rounded-full px-2 py-1 text-sm items-center bg-purple-100">
                                    <span>{member.email}</span>
                                    <button
                                      className="ml-1"
                                      onClick={() =>
                                        handleUpdateUser(
                                          user._id,
                                          member._id,
                                          "pop"
                                        )
                                      }
                                    >
                                      <CloseIcon className="h-4 w-4 text-purple-500" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                        </div>
                        {user?.members && user?.members?.length > 3 && (
                          <div>
                            {expandedRows[index] && (
                              <div className="flex flex-wrap">
                                {user.members
                                  .slice(3)
                                  .map((member, memberIndex) => (
                                    <div
                                      key={memberIndex}
                                      className="flex mb-2"
                                    >
                                      <div className="flex rounded-full px-2 py-1 text-sm items-center mr-2 mt-3 bg-purple-100">
                                        <span>{member.email}</span>
                                        <button
                                          className="ml-1"
                                          onClick={() =>
                                            handleUpdateUser(
                                              user._id,
                                              member._id,
                                              "pop"
                                            )
                                          }
                                        >
                                          <CloseIcon className="h-4 w-4 text-purple-500" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}{" "}
                        <PlusIcon
                          className="h-5 w-5 text-green-500 cursor-pointer"
                          onClick={() => {
                            setisAssignOpen(true);
                            setEditedDepartment(user);
                            setDepartmentId(user._id);
                          }}
                        />
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
                                      setEditedDepartment(user);
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
                                    onClick={() => handleDelete(user?._id)}
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
            onClick={() => handleDelete(user?._id)}
          />
        </td> */}
                      <td className="px-3 py-3 text-left text-sm text-gray-900">
                        <UpDownIcon
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => handleExpand(index)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-3 py-4 text-left text-sm text-gray-900"
                    >
                      No departments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {isAssignOpen && (
              <Modal closeModal={() => setisAssignOpen(false)}>
                <form
                  onSubmit={handleSubmit((data) =>
                    handleUpdateUser(departmentId, data, "push")
                  )}
                >
                  <h1 className="flex-auto font-semibold">Add Members</h1>

                  <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
                    Names or emails
                  </h1>
                  <Controller
                    name="members"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledMultipleSelection
                          options={selectOptions}
                          // initialValues={
                          //   editedDepartment
                          //     ? editedDepartment.members.map((member) => ({
                          //         value: member._id,
                          //         label: member.email,
                          //       }))
                          //     : []
                          // }
                          {...field}
                        />
                        {errors.members && (
                          <span className="text-red-500">
                            {errors.members.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "members is required" }}
                  />
                  <div className="flex  justify-end gap-4">
                    <button
                      className="font-semibold  mt-3"
                      onClick={() => setisAssignOpen(false)}
                    >
                      Cancel
                    </button>
                    <StyledButton text="Add" type="submit" />
                  </div>
                </form>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDepartment;

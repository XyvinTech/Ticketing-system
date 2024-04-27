import { Switch } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { ReactComponent as UpDownIcon } from "../../assets/icons/UpDownIcon.svg";
import StyledText from "../../ui/StyledText";
import { useDepartmentStore } from "../../store/DepartmentStore";

const AdminDepartment = () => {
  const [enabled, setEnabled] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isAssignOpen, setisAssignOpen] = useState(false);
  const { departments, fetchDepartment, addDepartment } = useDepartmentStore();
  const [expandedRows, setExpandedRows] = useState([]);
  const handleRowClick = (index) => {
    const newRowState = [...expandedRows];
    if (newRowState.includes(index)) {
      newRowState.splice(newRowState.indexOf(index), 1);
    } else {
      newRowState.push(index);
    }
    setExpandedRows(newRowState);
  };
  useEffect(() => {
    fetchDepartment();
  }, [isChange]);

  const onSubmit = async (data) => {
    try {
      await addDepartment(data);
      toast.success("Department Added successfully!");
      setIsChange(!isChange);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };
  console.log("allDepartment", departments);
  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <h1 className="text-xl font-semibold">Department</h1>

      <div className="mb-4 pr-5 flex justify-between items-center">
        <div className="flex mt-5 gap-3 divide-x divide-dashed text-sm text-gray-500">
          <div className="font-semibold">All(5)</div>
        </div>
        <StyledButton text="Add Group" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="flex-auto font-semibold">New Category</h1>

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
                onClick={() => setIsModalOpen(false)}
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
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 max-md:flex-wrap items-center">
                      <div className="flex flex-grow ml-0 sm:ml-28 gap-3 sm:flex sm:flex-wrap sm:justify-start">
                        <div className="flex overflow-hidden relative justify-center w-full sm:w-auto rounded-md border border-gray-300 border-solid">
                          <button className="h-9 w-full font-semibold  sm:w-32 relative shrink-0 bg-white border-r border-gray-300 mr-0">
                            Delete
                          </button>
                          <button
                            className="h-9 w-full font-semibold  text-purple-600 sm:w-32 relative shrink-0 bg-white ml-0"
                            onClick={() => setisAssignOpen(true)}
                          >
                            Assign
                          </button>
                        </div>

                        <div className="flex items-center space-x-2 ">
                          <Switch.Group>
                            <div className="flex items-center">
                              <Switch.Label className="mr-2 font-semibold ">
                                Disable
                              </Switch.Label>
                              <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${
                                  enabled ? "bg-purple-600" : "bg-gray-200"
                                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                              >
                                <span
                                  className={`${
                                    enabled ? "translate-x-6" : "translate-x-1"
                                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                />
                              </Switch>
                            </div>
                          </Switch.Group>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {isAssignOpen && (
                  <Modal closeModal={() => setisAssignOpen(false)}>
                    <h1 className="flex-auto font-semibold">
                      Assign to Project Manager
                    </h1>

                    <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
                      Names or emails
                    </h1>
                    <StyledInput />
                    <div className="flex  justify-end gap-4">
                      <button
                        className="font-semibold  mt-3"
                        onClick={() => setisAssignOpen(false)}
                      >
                        Cancel
                      </button>
                      <StyledButton text="Add" />
                    </div>
                  </Modal>
                )}
                <tr className="text-left font-semibold  text-sm  text-gray-900">
                  <td className="px-3 py-3 ">Name</td>
                  <td className="px-3 py-3  ">Asssigned to</td>
                  <td className="px-3 py-3  "></td>
                </tr>
              </thead>
              <tbody>
                {departments.map((user, index) => (
                  <tr key={index} className=" mb-2 border-b border-gray-200">
                    <td className="px-3 py-4 text-left text-sm text-gray-900">
                      <input type="checkbox" class="mr-2  accent-purple-500" />
                      {user.departmentName}
                    </td>

                    <td className="text-sm text-gray-900">
                      {user.members ? (
                        user.members.map((member, memberIndex) => (
                          <div key={memberIndex} className="flex mb-2">
                            {/* Display member information */}
                            <div className="flex rounded-full px-2 py-1 text-sm items-center mr-2 mt-3 bg-purple-100">
                              <span>{member.email}</span>
                              <button className="ml-1">
                                <CloseIcon className="h-4 w-4 text-purple-500" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <span>No members found.</span> // Display this message if members is null or undefined
                      )}
                    </td>

                    <td className="px-3 py-3 text-left text-sm text-gray-900">
                      <button onClick={() => handleRowClick(index)}>
                        <UpDownIcon className="h-4 w-4" />
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

export default AdminDepartment;

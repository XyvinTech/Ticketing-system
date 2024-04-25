import React, { useState } from "react";
import StyledSelectionList from "../../ui/StyledSelectionList";
import Modal from "../../ui/Modal";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import { Switch } from "@headlessui/react";

const AddPeople = () => {
  const people = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    // Add more sample data as needed
  ];
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const Role = [
    { name: "Member" },
    { name: "Designer" },
    { name: "Developer" },
  ];

  const [enabled, setEnabled] = useState(false);
  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <h1 className="text-xl font-semibold">Access</h1>
      <div className="mb-4 pr-5 flex justify-end">
        <StyledButton text="Add People" onClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <h1 className="flex-auto font-semibold">Add People to My Project</h1>

          <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
            Names or emails
          </h1>
          <StyledInput />

          <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">
            Role
          </h1>
          <StyledSelectionList options={Role} listname="Roles" />
          <div className="flex  justify-end gap-4">
            <button
              className="font-semibold  mt-3"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <StyledButton text="Add" />
          </div>
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
                      <div className="flex flex-grow ml-0 sm:ml-28 gap-1 sm:flex sm:flex-wrap sm:justify-start">
                        <div className="flex overflow-hidden relative flex-col justify-center w-full sm:w-auto">
                          <button className="h-9 w-full sm:w-32 relative shrink-0 bg-white rounded-md border border-gray-300 border-solid">
                            Delete
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-1">
                          <Switch.Group>
                            <div className="flex items-center">
                              <Switch.Label className="mr-2">
                                Remove Role
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
                <tr>
                  <td className="px-3 py-3 text-left text-sm text-gray-900">
                    Name
                  </td>
                  <td className="px-3 py-3 text-left text-sm text-gray-900">
                    Email
                  </td>
                  <td className="px-3 py-3 text-left text-sm text-gray-900">
                    Role
                  </td>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr key={person.id}>
                    <td className="px-3 py-3 text-left text-sm text-gray-900">
                      {person.name}
                    </td>
                    <td className="px-3 py-3 text-left text-sm text-gray-900">
                      {person.email}
                    </td>
                    <td className="lg:absolute text-left text-sm text-gray-900">
                      <div className="lg:relative">
                        {" "}
                        <StyledSelectionList options={Role} listname="Roles" />
                      </div>
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

export default AddPeople;

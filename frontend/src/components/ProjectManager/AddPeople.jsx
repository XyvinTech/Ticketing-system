import { Menu } from "@headlessui/react";
import React, { useState } from "react";

import { ReactComponent as MenuIcon } from "../../assets/icons/MenuVerticalIcon.svg";
import StyledSelectionList from "../../ui/StyledSelectionList";
import Modal from "../../ui/Modal";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";

const AddPeople = () => {
  // Sample data array
  const [people, setPeople] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    // Add more sample data as needed
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const Role = [
    { name: "Member" },
    { name: "Designer" },
    { name: "Developer" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8">
      <h1 className="text-xl font-semibold">Access</h1>
      <div className="mb-4 pr-5 flex justify-end">
        <StyledButton text="Add People" onClick={openModal} />
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <h1 className="flex-auto font-semibold">Add People to My Project</h1>

          <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
            Names or emails
          </h1>
          <StyledInput />
          <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
            or add from
          </h1>
          <button className="py-1 px-3 mt-2 leading-8 text-center whitespace-nowrap bg-white rounded border border-solid border-sky-950 border-opacity-10 w-full text-blue-950 text-lg">
            {" "}
            {/* Added w-full class */}
            Google
          </button>

          <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">
            Role
          </h1>
          <StyledSelectionList options={Role} />

          <div className="mt-4 text-xs leading-4 text-slate-500">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </div>
          <div className="flex  justify-end gap-4">
            <button className="font-semibold  mt-3">Cancel</button>
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
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 max-md:flex-wrap">
                      <div className="flex-grow lg:w-20 max-w-xs ">
                    
                        <StyledInput placeholder="Search" Icon={SearchIcon} />
                      </div>
                      <div>
                        <StyledSelectionList options={Role} />
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
                  <td className="px-3 py-3 text-left text-sm text-gray-900">
                    Action
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
                        <StyledSelectionList options={Role} />
                      </div>
                    </td>
                    <td className="px-3 py-3 text-left text-sm text-gray-900">
                      <Menu>
                        <Menu.Button className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                          <MenuIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                        </Menu.Button>

                        <Menu.Items className="absolute right-0 sm:right-auto w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-purple-600 text-white"
                                      : "text-gray-700"
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  Unassign
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

import React, { useState } from "react";
import TicketGrid from "../../ui/TicketGrid";
import StyledInput from "../../ui/StyledInput";
import StyledTable from "../../ui/StyledTable";
import StyledButton from "../../ui/StyledButton";
import TableInfo from "../../ui/TableInfo";
import { Link } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { ReactComponent as GoogleIcon } from "../../assets/icons/GoogleIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import ManagerBoard from "./ManagerBoard";
import StyledSelectionList from "../../ui/StyledSelectionList";
import Modal from "../../ui/Modal";
import DropDown from "../../ui/DropDown";
import { Switch } from "@headlessui/react";

const ManagerTicket = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const items = [
    { name: "Total", count: 7 },
    { name: "Assigned", count: 7 },
    { name: "Unassigned", count: 0 },
    { name: "Resolved", count: 0 },
    { name: "Closed", count: 0 },
  ];

  const dummyTickets = [
    {
      id: 1,
      reference: "REF001",
      subject: "HOW I TR",
      priority: "High",
      created_at: "March 5,2024",
      category: { name: "Category A" },
      replies: [{ created_at: "--" }],
      status: "assigned",
      assignedto: "Assign a member Now",
    },
    {
      id: 2,
      reference: "REF001",
      subject: "HOW I TR",
      priority: "High",
      created_at: "March 5,2024",
      category: { name: "Category A" },
      replies: [{ created_at: "--" }],
      status: "assigned",
      assignedto: "Assign a member Now",
    },
    // Add more dummy tickets as needed
  ];

  const headers = ["Ticket", "Assigned To", "Status"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyTickets.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(dummyTickets.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleBoardButtonClick = () => {
    setShowAdminBoard(true);
  };

  const Manager = [
    { name: "My Tickets" },
    { name: "Project Manager" },
    { name: "Project Lead" },
  ];
  const Role = [
    { name: "Member" },
    { name: "Designer" },
    { name: "Developer" },
  ];
  const Status = [
    { name: "assigned" },
    { name: "In progress" },
    { name: "completed" },
    { name: "Archived" },
  ];
  return (
    <div>
      <section className="py-6 px-4 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Tickets</h1>
        <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-5">
          <TicketGrid item={items} />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-3 pb-4 max-md:flex-wrap">
          <div className="mt-4 flex flex-col md:flex-row items-center gap-3 md:items-center md:flex">
            <StyledInput placeholder="Search" Icon={SearchIcon} />
            <DropDown label="Project Lead" options={Role} />
            <DropDown label="Status" options={Status} />
            <button
              className="mt-1 cursor-default rounded-md border bg-white py-2 pl-3 pr-3 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 text-gray-900 focus:border-purple-300 focus:ring-purple-500"
              onClick={handleBoardButtonClick}
            >
              Board
            </button>
            <div className="flex items-center space-x-2 ">
                          <Switch.Group>
                            <div className="flex items-center">
                              <Switch.Label className="mr-2 font-semibold ">
                                My Tickets
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
          <div className="flex items-center">
            <StyledButton
              text="Assign Ticket"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
        {showAdminBoard && <ManagerBoard />}{" "}
        {isModalOpen && (
          <Modal closeModal={() => setIsModalOpen(false)}>
            <h1 className="flex-auto font-semibold">
              Add People to My Project
            </h1>

            <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
              Names or emails
            </h1>
            <StyledInput placeholder="eg:Maria, maria@gmail.com" />
            <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
              or add from
            </h1>
            <button className="py-1 px-3 mt-2 leading-8 text-center whitespace-nowrap bg-white rounded border border-solid border-sky-950 border-opacity-10 flex items-center justify-center w-full text-blue-950 text-lg">
              <GoogleIcon className="w-4 h-4 mr-2" />
              Google
            </button>

            <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">
              Role
            </h1>
            <StyledSelectionList listname="Role " options={Role} />

            <div className="mt-4 text-xs leading-4 text-slate-500">
              This site is protected by reCAPTCHA and the Google
              <br></br>
              Privacy Policy and Terms of Service apply.
            </div>
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
        {!showAdminBoard && (
          <StyledTable header={headers}>
            {currentItems.map((i) => (
              <tr key={i.id}>
                <td className="whitespace-nowrap text-sm text-gray-500 px-3 py-4">
                  <input type="checkbox" class="mr-2  accent-purple-500" />
                  <Link
                    to={"/ProjectManager/ManagerSingleTicket"}
                    className="text-lg font-semibold text-purple-600 hover:text-purple-800"
                  >
                    {i.subject}
                  </Link>
                  <TableInfo
                    reference={i.reference}
                    priority={i.priority}
                    createdAt={i.created_at}
                    category={i.category.name}
                    last_reply_on={i.replies[0]?.created_at}
                  />
                </td>
                <td className="whitespace-nowrap text-sm text-left text-gray-500 px-3 py-3.5">
              
                    {" "}
                    <span
                      className={`rounded-full px-3 py-px text-sm
                      ${
                        i.assignedto === "Assign a member Now"
                          ? "bg-indigo-100 text-indigo-800"
                          : i.assignedto === "Notify ProjectManager"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }`}
                    >
                      {i.assignedto}
                    </span>
                </td>
                <td className="whitespace-nowrap text-sm text-left text-gray-500 px-3 py-3.5">
                  <span
                    className={`rounded-full px-3 py-px text-sm
                      ${
                        i.status === "assigned"
                          ? "bg-indigo-100 text-indigo-800"
                          : i.status === "unassigned"
                          ? "bg-gray-100 text-gray-800"
                          : i.status === "closed"
                          ? "bg-red-100 text-red-800"
                          : i.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
                  >
                    {i.status}
                  </span>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" className="px-4 py-2">
                <Pagination
                  currentPage={currentPage}
                  totalItems={dummyTickets.length}
                  itemsPerPage={itemsPerPage}
                  paginate={paginate}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                />
              </td>
            </tr>
          </StyledTable>
        )}
      </section>
    </div>
  );
};

export default ManagerTicket;

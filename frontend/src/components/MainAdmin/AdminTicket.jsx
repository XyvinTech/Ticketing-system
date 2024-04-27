import React, { useEffect, useState } from "react";
import TicketGrid from "../../ui/TicketGrid";
import StyledInput from "../../ui/StyledInput";
import StyledTable from "../../ui/StyledTable";
import StyledButton from "../../ui/StyledButton";
import TableInfo from "../../ui/TableInfo";
import { Link } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import AdminBoard from "./AdminBoard";
import StyledSelectionList from "../../ui/StyledSelectionList";
import Modal from "../../ui/Modal";
import DropDown from "../../ui/DropDown";
import { useTicketStore } from "../../store/TicketStore";

const AdminTicket = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const { tickets, fetchTickets } = useTicketStore();
  useEffect(() => {
    fetchTickets();
  }, []);
  const items = [
    { name: "Total", count: tickets.length },
    { name: "Assigned", count: 7 },
    { name: "Unassigned", count: 0 },
    { name: "Resolved", count: 0 },
    { name: "Closed", count: 0 },
  ];

  const headers = ["Ticket", "Assigned To", "Status", "Assign"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const item = Array.isArray(tickets) ? tickets.slice(indexOfFirstItem, indexOfLastItem) : [];

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
    if (currentPage < Math.ceil(tickets.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleBoardButtonClick = () => {
    setShowAdminBoard(true);
  };

  const Manager = [
    { name: "All" },
    { name: "My Tickets" },
    { name: "Project Manager" },
    { name: "Project Lead" },
  ];
  const Role = [{ name: "Member" }, { name: "Designer" }, { name: "Developer" }];
  const Status = [
    { name: "assigned" },
    { name: "In progress" },
    { name: "completed" },
    { name: "Archived" },
  ];
  console.log("tickets", tickets);
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
            <DropDown label="Category" options={Role} />
            <DropDown label="Status" options={Status} />
            <DropDown label="Manager" options={Manager} />
            <button
              className="mt-1 cursor-default rounded-md border bg-white py-2 pl-3 pr-3 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 text-gray-900 focus:border-purple-300 focus:ring-purple-500"
              onClick={handleBoardButtonClick}
            >
              Board
            </button>
          </div>
        </div>
        {showAdminBoard && <AdminBoard />}{" "}
        {isModalOpen && (
          <Modal closeModal={() => setIsModalOpen(false)}>
            <h1 className="flex-auto font-semibold">Add People to My Project</h1>

            <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">Names or emails</h1>
            <StyledInput placeholder="eg:Maria, maria@gmail.com" />

            <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">Role</h1>
            <StyledSelectionList listname="Role " options={Role} />

            <div className="flex  justify-end gap-4">
              <button className="font-semibold  mt-3" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <StyledButton text="Add" />
            </div>
          </Modal>
        )}
        {!showAdminBoard && (
          <StyledTable header={headers}>
            {item.map((tickets) => (
              <tr key={tickets._id}>
                <td className="whitespace-nowrap text-sm text-gray-500 px-3 py-4">
                  <input type="checkbox" class="mr-2  accent-purple-500" />
                  <Link
                    to={"/Admin/SingleTicket"}
                    className="text-lg font-semibold text-purple-600 hover:text-purple-800"
                  >
                    {tickets.subject}
                  </Link>
                  <TableInfo
                    reference={tickets.ticket_Id}
                    priority={tickets.priority}
                    createdAt={tickets.createdAt}
                    category={tickets?.department?.departmentName}
                    // last_reply_on={i.replies[0]?.created_at}
                  />
                </td>
                <td className="whitespace-nowrap text-sm text-left text-gray-500 px-3 py-3.5">
                  <button
                    onClick={() => setIsNotifyOpen(tickets.assignedto === "Notify ProjectManager")}
                  >
                    <span
                      className={`rounded-full px-3 py-px text-sm
      ${
        tickets.assignedto === "Assign a member Now"
          ? "bg-indigo-100 text-indigo-800"
          : tickets.assignedto === "Notify ProjectManager"
          ? "bg-red-100 text-red-800"
          : ""
      }`}
                    >
                      {tickets.assignedto}
                    </span>
                  </button>{" "}
                  {isNotifyOpen && tickets.assignedto === "Notify ProjectManager" && (
                    <Modal closeModal={() => setIsNotifyOpen(false)}>
                      <h1 className="flex-auto font-semibold text-black">Notify Project Manager</h1>

                      <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">To</h1>
                      <StyledInput placeholder="eg:Maria, maria@gmail.com" />
                      <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">Sub</h1>
                      <StyledInput placeholder="Notify admin about new ticket" />

                      <h1 className="mt-5 text-xs font-semibold leading-4 text-slate-500">Notes</h1>

                      <StyledInput placeholder="Enter Your Notes" />

                      <div className="flex  justify-end gap-4">
                        <button
                          className="font-semibold  mt-3 text-black"
                          onClick={() => setIsNotifyOpen(false)}
                        >
                          Cancel
                        </button>
                        <StyledButton text="Notify" />
                      </div>
                    </Modal>
                  )}
                </td>

                <td className="whitespace-nowrap text-sm text-left text-gray-500 px-3 py-3.5">
                  <span
                    className={`rounded-full px-3 py-px text-sm
                      ${
                        tickets.status === "assigned"
                          ? "bg-indigo-100 text-indigo-800"
                          : tickets.status === "Archived"
                          ? "bg-gray-100 text-gray-800"
                          : tickets.status === "Not Started"
                          ? "bg-red-100 text-red-800"
                          : tickets.status === "Done"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
                  >
                    {tickets.status}
                  </span>
                </td>
                <td>
                  <StyledButton text="Assign Ticket" onClick={() => setIsModalOpen(true)} />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" className="px-4 py-2">
                <Pagination
                  currentPage={currentPage}
                  totalItems={tickets.length}
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

export default AdminTicket;

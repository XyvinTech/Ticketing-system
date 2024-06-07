import React, { useEffect, useState } from "react";
import TicketGrid from "../../ui/TicketGrid";
import StyledInput from "../../ui/StyledInput";
import StyledButton from "../../ui/StyledButton";
import TableInfo from "../../ui/TableInfo";
import { Link } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import Modal from "../../ui/Modal";
import DropDown from "../../ui/DropDown";
import { useTicketStore } from "../../store/TicketStore";
import { useUserStore } from "../../store/UserStore";
import { Controller, useForm } from "react-hook-form";
import StyledSearch from "../../ui/StyledSearch";
import { useDepartmentStore } from "../../store/DepartmentStore";
import AdminTable from "../../ui/AdminTable";

const AdminTicket = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { tickets, fetchTickets, updateTicket, deleteTicket } =
    useTicketStore();
  const { users, getUserByProject } = useUserStore();
  const { departments, fetchDepartment } = useDepartmentStore();
  const [ticketId, setTicketId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [search, setSearch] = useState();
  const [status, setStatus] = useState();
  const [dep, setDep] = useState();
  const [project, setProject] = useState();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const handleCheckboxChange = (ticketId) => {
    if (selectedTickets.includes(ticketId)) {
      setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
    } else {
      setSelectedTickets([...selectedTickets, ticketId]);
    }
  };
  const handleSelectAllTickets = () => {
    const allTicketIds = sortedTickets.map((ticket) => ticket._id);
    if (selectAll) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(allTicketIds);
    }
    setSelectAll(!selectAll);
  };
  useEffect(() => {
    let filter = {};
    if (status && status !== "all") {
      filter.inStatus = status;
    }
    if (dep && dep !== "all") {
      filter.inDep = dep;
    }
    if (search) {
      filter.searchQuery = search;
    }
    fetchTickets(filter);
  }, [isChange, search, status, dep]);
  useEffect(() => {
    let filter = {};
    filter.withOutClient = true;
    filter.projectId = project;
    getUserByProject(filter);
  }, [project]);
  useEffect(() => {
    fetchDepartment();
  }, []);
  const sortedTickets =
    tickets && Array.isArray(tickets)
      ? [...tickets].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : [];

  let pendingCount = 0;
  let progressCount = 0;
  let completedCount = 0;

  if (Array.isArray(sortedTickets)) {
    sortedTickets.forEach((ticket) => {
      if (ticket?.status === "pending") {
        pendingCount++;
      } else if (ticket?.status === "progress") {
        progressCount++;
      } else if (ticket?.status === "completed") {
        completedCount++;
      }
    });
  }
  const items = [
    { name: "Total", count: sortedTickets?.length },
    { name: "Pending", count: pendingCount },
    { name: "Progress", count: progressCount },
    { name: "Closed", count: completedCount },
  ];
  const selectOptions =
    users && Array.isArray(users)
      ? users.map((user) => ({
          value: user?._id,
          label: user?.email,
          userType: user?.usertype,
        }))
      : [];

  const headers = ["Ticket", "Assigned To", "Status", "Assign"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const item = Array.isArray(sortedTickets)
    ? sortedTickets.slice(indexOfFirstItem, indexOfLastItem)
    : [];

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

  const options = [
    { value: "all", name: "All" },
    { value: "myticket", name: "My Ticket" }, // Adding the "All" option
    ...departments.map((project) => ({
      value: project._id,
      name: project.departmentName,
    })),
  ];

  const Status = [
    { value: "all", name: "all" },
    { value: "pending", name: "pending" },
    { value: "progress", name: "progress" },
    { value: "completed", name: "completed" },
  ];
  const handleDeleteSelectedTickets = async () => {
    try {
      await deleteTicket(selectedTickets);

      setIsChange(!isChange);

      setSelectedTickets([]);
    } catch (error) {
      console.error("Error deleting selected tickets:", error);
    }
  };
  const onSubmit = async (data, ticketId) => {
    try {
      await updateTicket(ticketId, data);
      setIsChange(!isChange);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding :", error);
    }
  };

  return (
    <div>
      <section className="py-6 px-4 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Tickets</h1>
        <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-5 ">
          <TicketGrid item={items} />
        </div>
        <div className="pb-4 lg:flex lg:justify-start lg:gap-4">
          {/* First Row */}
          <div className="row mb-4">
            <div className="col">
              <StyledInput
                placeholder="Search"
                Icon={SearchIcon}
                onChange={(e) => setSearch(e.target.value)}
                className="w-100"
              />
            </div>
          </div>
          <div className="flex lg:gap-4 sm:mb-8">
            <div className="w-1/2 pr-1 lg:w-44 mb-4 lg:mb-0">
              {" "}
              {/* Adjusted margin-bottom */}
              <DropDown
                label="All"
                options={options}
                onChange={(value) => setDep(value)}
                className="w-100"
              />
            </div>
            <div className="w-1/2 mb-4 lg:mb-0">
              {" "}
              {/* Adjusted margin-bottom */}
              <DropDown
                label="Status"
                options={Status}
                onChange={(value) => setStatus(value)}
                className="w-100"
              />
            </div>
          </div>
          {selectedTickets?.length > 0 && (
            <div className="row mb-4 sm:mb-0 sm:mt-20 lg:mt-1">
              <div className="col sm:mb-0">
                {" "}
                {/* Remove the margin bottom in small screens */}
                <button
                  className="bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-3 rounded inline-flex items-center"
                  onClick={handleDeleteSelectedTickets}
                  disabled={selectedTickets.length === 0}
                >
                  Delete
                </button>
                {/* Display selected tickets count */}
                <span className="ml-2 text-gray-600">
                  {selectedTickets?.length} Selected
                </span>
              </div>
            </div>
          )}
        </div>

        {/* {showAdminBoard && <AdminBoard />}{" "} */}
        {isModalOpen && (
          <Modal closeModal={() => setIsModalOpen(false)}>
            <form onSubmit={handleSubmit((data) => onSubmit(data, ticketId))}>
              <h1 className="flex-auto font-semibold">Assign People</h1>

              <h1 className="mt-4 text-xs font-semibold leading-4 text-slate-500">
                Names or emails
              </h1>
              <Controller
                name="assignedTo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <StyledSearch options={selectOptions} {...field} />
                    {errors.assignedTo && (
                      <span className="text-red-500">
                        {errors.assignedTo.message}
                      </span>
                    )}
                  </>
                )}
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

        <AdminTable
          header={headers}
          selectAll={selectAll}
          onHeaderCheckboxChange={handleSelectAllTickets}
        >
          {item?.map((tickets) => (
            <tr key={tickets?._id}>
              <td className="whitespace-nowrap text-sm text-gray-500 px-3 py-4">
                <input
                  type="checkbox"
                  class="mr-2  accent-purple-500"
                  checked={selectedTickets.includes(tickets?._id)}
                  onChange={() => handleCheckboxChange(tickets?._id)}
                />
                <Link
                  to={`/Support/SingleTicket/${tickets?._id}`}
                  className="text-lg font-semibold text-purple-600 hover:text-purple-800"
                >
                  {tickets?.subject}
                </Link>
                <TableInfo
                  reference={tickets?.ticket_Id}
                  priority={tickets?.priority}
                  createdAt={tickets?.createdAt}
                  category={tickets?.department?.departmentName}
                  // last_reply_on={i.replies[0]?.created_at}
                  projectName={tickets?.projectId?.projectName}
                />
              </td>
              <td className="whitespace-nowrap text-sm text-left text-gray-500 px-3 py-4">
                {tickets?.assignedTo?.email}
              </td>

              <td className="whitespace-nowrap text-sm text-left text-gray-500 px-3 py-3.5">
                <span
                  className={`rounded-full px-3 py-px text-sm
                      ${
                        tickets?.status === "progress"
                          ? "bg-indigo-100 text-indigo-800"
                          : tickets?.status === "deleted"
                          ? "bg-gray-100 text-gray-800"
                          : tickets?.status === "pending"
                          ? "bg-red-100 text-red-800"
                          : tickets?.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
                >
                  {tickets?.status === "completed" ? "Closed" : tickets?.status}
                </span>
              </td>
              <td>
                {tickets.status !== "completed" && (
                  <StyledButton
                    text={tickets?.assignedTo?.email ? "Reassign" : "Assign"}
                    onClick={() => {
                      setIsModalOpen(true);
                      setTicketId(tickets?._id);
                      setProject(tickets?.projectId._id);
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" className="px-4 py-2">
              <Pagination
                currentPage={currentPage}
                totalItems={tickets?.length}
                itemsPerPage={itemsPerPage}
                paginate={paginate}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
              />
            </td>
          </tr>
        </AdminTable>
      </section>
    </div>
  );
};

export default AdminTicket;

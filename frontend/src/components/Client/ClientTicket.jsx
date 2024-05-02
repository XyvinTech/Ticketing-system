import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Link } from "react-router-dom";
import TableInfo from "../../ui/TableInfo";
import TicketGrid from "../../ui/TicketGrid";
import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import StyledButton from "../../ui/StyledButton";
import StyledInput from "../../ui/StyledInput";
import Pagination from "../../ui/Pagination";
import ClientBoard from "./ClientBoard";
import { useTicketStore } from "../../store/TicketStore";
import DropDown from "../../ui/DropDown";
const ClientTicket = () => {
  const { tickets, fetchTickets } = useTicketStore();
  const [search, setSearch] = useState();
  const [status, setStatus] = useState();
  useEffect(() => {
    let filter = {};
    if (status && status !== "all") {
      filter.inStatus = status;
    }
    if (search) {
      filter.searchQuery = search;
    }
    fetchTickets(filter);
  }, [search, status]);

  const headers = ["Ticket", "Status"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const item = Array.isArray(tickets)
    ? tickets.slice(indexOfFirstItem, indexOfLastItem)
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
    if (currentPage < Math.ceil(tickets?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pendingCount = tickets.filter(
    (ticket) => ticket.status === "pending"
  ).length;
  const progressCount = tickets.filter(
    (ticket) => ticket.status === "progress"
  ).length;
  const completedCount = tickets.filter(
    (ticket) => ticket.status === "completed"
  ).length;
  const items = [
    { name: "Total", count: tickets?.length },
    { name: "Pending", count: pendingCount },
    { name: "Progress", count: progressCount },
    { name: "Completed", count: completedCount },
    { name: "Closed", count: 0 },
  ];
  const Status = [
    { value: "all", name: "all" },
    { value: "pending", name: "pending" },
    { value: "progress", name: "progress" },
    { value: "completed", name: "completed" },
  ];
  return (
    <div>
      <section className="py-6 px-4 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Tickets</h1>
        <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-5">
          <TicketGrid item={items} />
        </div>
        <div className="flex gap-0 justify-between max-md:flex-wrap">
          <div className="mt-4 flex flex-col md:flex-row items-center gap-3 md:items-center md:flex">
            <StyledInput
              placeholder="Search"
              Icon={SearchIcon}
              onChange={(e) => setSearch(e.target.value)}
            />

            <DropDown
              label="Status"
              options={Status}
              onChange={(value) => setStatus(value)}
            />
          </div>
          <div className="flex gap-0 justify-center pb-4 text-sm font-medium leading-5 text-white whitespace-nowrap rounded-md shadow-sm">
            <Link to={"/Client/Ticket/ClientNewTicket"}>
              <StyledButton text="New Ticket" />
            </Link>
          </div>
        </div>

        <StyledTable header={headers}>
          {item?.map((tickets) => (
            <tr key={tickets?._id}>
              <td className="whitespace-nowrap text-sm text-gray-500 px-3 py-4">
                {/* <input type="checkbox" class="mr-2  accent-purple-500" /> */}
                <Link
                  to={`/Client/Ticket/SingleTicket/${tickets?._id}`}
                  className="text-lg font-semibold text-purple-600 hover:text-purple-800"
                >
                  {tickets?.subject}
                </Link>
                <TableInfo
                  reference={tickets?.ticket_Id}
                  priority={tickets?.priority}
                  createdAt={tickets?.createdAt}
                  category={tickets?.department?.departmentName}
                  // last_reply_on={tickets.replies[0]?.created_at}
                  projectName={tickets?.projectId?.projectName}
                />
              </td>
              <td className="whitespace-nowrap text-sm  text-gray-500 px-3 py-4">
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
                  {tickets.status}
                </span>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" className="px-3 py-4">
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
      </section>
    </div>
  );
};

export default ClientTicket;

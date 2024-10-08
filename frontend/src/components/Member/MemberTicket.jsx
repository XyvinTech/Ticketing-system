import React, { useEffect, useState } from "react";
import TicketGrid from "../../ui/TicketGrid";
import StyledInput from "../../ui/StyledInput";
import StyledTable from "../../ui/StyledTable";
import TableInfo from "../../ui/TableInfo";
import { Link } from "react-router-dom";
import Pagination from "../../ui/Pagination";

import { ReactComponent as SearchIcon } from "../../assets/icons/SearchIcon.svg";
import { useTicketStore } from "../../store/TicketStore";
import DropDown from "../../ui/DropDown";

const MemberTicket = () => {
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

  const headers = ["Ticket", "Status"];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(sortedTickets)
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
    if (currentPage < Math.ceil(tickets?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // const [isStatusOpen, setIsStatusOpen] = useState(false);

  //  const statuses = ["assigned", "unassigned", "closed", "resolved"];
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

          <DropDown
            label="Status"
            options={Status}
            onChange={(value) => setStatus(value)}
            className="w-100"
          />
        </div>

        <StyledTable header={headers}>
          {currentItems?.map((i) => (
            <tr key={i._id}>
              <td className="whitespace-nowrap text-sm text-gray-500 px-3 py-4">
                {/* <input type="checkbox" className="mr-2 checkbox-purple" /> */}
                <Link
                  to={`/Member/SingleTicket/${i?._id}`}
                  className="text-lg font-semibold text-purple-600 hover:text-purple-800"
                >
                  {i?.subject}
                </Link>
                <TableInfo
                  reference={i?.ticket_Id}
                  priority={i?.priority}
                  createdAt={i?.createdAt}
                  category={i?.department?.departmentName}
                  projectName={i?.projectId?.projectName}
                  // last_reply_on={i.replies[0]?.created_at}
                />
              </td>
              <td className="whitespace-nowrap text-sm text-left text-gray-500 px-3 py-3.5">
                {/* <button onClick={() => setIsStatusOpen(true)} > */}
                <span
                  className={`rounded-full px-3 py-px text-sm
                      ${
                        i?.status === "progress"
                          ? "bg-indigo-100 text-indigo-800"
                          : i?.status === "deleted"
                          ? "bg-gray-100 text-gray-800"
                          : i?.status === "pending"
                          ? "bg-red-100 text-red-800"
                          : i?.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
                >
                  {i?.status === "completed" ? "Closed" : i?.status}
                </span>
                {/* </button> */}
                {/* {isStatusOpen && (
                    <Modal  closeModal={() => setIsStatusOpen(false)}>
                         <div className="grid gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              className={`rounded-full px-4 py-2 text-sm
                          ${
                            status === "assigned"
                              ? "bg-indigo-100 text-indigo-800"
                              : status === "unassigned"
                              ? "bg-gray-100 text-gray-800"
                              : status === "closed"
                              ? "bg-red-100 text-red-800"
                              : status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }`}
              onClick={() => {
                // Handle status selection here
                console.log("Selected status:", status);
              }}
            >
              {status}
            </button>
          ))}
        </div>
                    </Modal>
                  )} */}
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
        </StyledTable>
      </section>
    </div>
  );
};

export default MemberTicket;

import React, { useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Link } from "react-router-dom";
import TableInfo from "../../ui/TableInfo";
import TicketGrid from "../../ui/TicketGrid";
import { ReactComponent as SearcIcon } from "../../assets/icons/SearchIcon.svg";
import StyledButton from "../../ui/StyledButton";
import StyledInput from "../../ui/StyledInput";
import Pagination from "../../ui/Pagination";
import ClientBoard from "./ClientBoard";

const ClientTicket = () => {
  
  const [showClientBoard, setShowClientBoard] = useState(false);
  const handleBoardButtonClick = () => {
    setShowClientBoard(true); 
  };
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
      subject: "Dummy Ticket 1",
      priority: "High",
      created_at: "2024-03-11T08:00:00Z",
      category: { name: "Category A" },
      replies: [{ created_at: "2024-03-11T08:30:00Z" }],
      status: "assigned",
    },
    {
      id: 2,
      reference: "REF002",
      subject: "Dummy Ticket 2",
      priority: "Medium",
      created_at: "2024-03-10T09:00:00Z",
      category: { name: "Category B" },
      replies: [{ created_at: "2024-03-10T09:30:00Z" }],
      status: "unassigned",
    },
    // Add more dummy tickets as needed
  ];

  const headers = ["Ticket", "Status"];

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

  return (
    <div>
      <section className="py-6 px-4 sm:p-6 lg:pb-8">
        <h1 className="mb-6 text-xl font-semibold">Tickets</h1>
        <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-5">
          <TicketGrid item={items} />
        </div>
        <div className="flex gap-0 justify-between max-md:flex-wrap">
          <div className="flex flex-auto gap-3 pr-20 max-md:flex-wrap">
            <div className="flex flex-col grow shrink-0 justify-center text-sm text-gray-500 whitespace-nowrap rounded-md shadow-sm basis-0 bg-white bg-opacity-0 w-fit">
              <StyledInput placeholder="Search" Icon={SearcIcon} />
            </div>
            <div className="flex overflow-hidden relative flex-col justify-center w-24 aspect-[2.53]">
              <button className="relative shrink-0 bg-gray-50 rounded-md border border-gray-300 border-solid h-[42px]">
                Filter
              </button>
            </div>
            <div className="flex overflow-hidden relative flex-col justify-center w-24 aspect-[2.53]">
              {" "}
              <button
                className="relative shrink-0 bg-gray-50 rounded-md border border-gray-300 border-solid h-[42px]"
                onClick={handleBoardButtonClick} // Call handleBoardButtonClick when the button is clicked
              >
                Board
              </button>
            </div>
          </div>
          <div className="flex gap-0 justify-center pb-4 text-sm font-medium leading-5 text-white whitespace-nowrap rounded-md shadow-sm">
            <Link to={'/Client/Ticket/ClientNewTicket'}>
              <StyledButton text="New Ticket" />
            </Link>
          </div>
        </div>
        {showClientBoard && <ClientBoard />}{" "}
        {!showClientBoard && (
        <StyledTable header={headers}>
          {currentItems.map((i) => (
            <tr key={i.id}>
              <td className="whitespace-nowrap text-sm text-gray-500 px-3 py-4">
                <input type="checkbox" className="mr-2 checkbox-purple" />
                <Link to={"/Client/Ticket/SingleTicket"} className="text-lg font-semibold text-purple-600 hover:text-purple-800">
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
        </StyledTable>)}
      </section>
    </div>
  );
};

export default ClientTicket;

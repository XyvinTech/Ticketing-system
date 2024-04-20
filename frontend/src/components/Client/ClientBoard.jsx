import React, { useEffect } from "react";
import { ReactComponent as PlusIcon } from "../../assets/icons/PlusIcon.svg";
import { Link } from "react-router-dom";
import { useTicketStore } from "../../store/TicketStore";

const Card = ({ card }) => {
  return (
    <div className="flex flex-col p-2 mt-1.5 w-full text-black bg-white rounded shadow-sm">
      <h3 className="text-sm text-stone-700 mb-2">{card.subject}</h3>
      <p className="justify-center self-start px-1.5 mt-1.5  text-xs leading-5 bg-red-100 rounded text-rose-950">
        {card.priority}
      </p>
    </div>
  );
};

const Column = ({ title, cards }) => {
  const totalCount = cards.length;

  return (
    <div className="w-1/4 p-1 ml-1">
      <div className="flex justify-start gap-2 items-center mb-2">
      
        <div>
          <h2
            className={`flex flex-col flex-1 justify-center self-start px-1 pr-3 pl-3 text-xs rounded-xl leading-[186%] max-w-[100px]
            ${
              title === "Not Started"
                ? "bg-red-100 text-cyan-950"
                : title === "Archived"
                ? "bg-gray-300 text-zinc-500"
                : title === "In Progress"
                ? "bg-slate-300 text-cyan-950"
                : title === "Done"
                ? "bg-emerald-100 text-emerald-900"
                : ""
            }`}
          >
            {title}
          </h2>
        </div>  <div className="flex items-center">
          <span className="text-xs text-cyan-500 mr-1">{totalCount}</span>
        </div>
      </div>
      <div className="bg-slate-100 text-white pl-1 pr-4 pt-1 pb-3">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
         {title === "Not Started" && (
          <Link to={"/Client/Ticket/ClientNewTicket"}>
            <button className="flex gap-1.5 text-blue-400 text-xs py-2 px-4 mt-2">
              <PlusIcon />
              <div className="mt-1">New</div>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};


const Board = ({ columns }) => {
  return (
    <div className="flex">
      {columns.map((column) => (
        <Column key={column.title} title={column.title} cards={column.cards} />
      ))}
    </div>
  );
};

const ClientBoard = () => {
  const { tickets, fetchTickets } = useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const columns = [
    { title: "Not Started", cards: tickets.filter(ticket => ticket.status === "Not Started") },
    { title: "In Progress", cards: tickets.filter(ticket => ticket.status === "In Progress") },
    { title: "Done", cards: tickets.filter(ticket => ticket.status === "Done") },
    { title: "Archived", cards: tickets.filter(ticket => ticket.status === "Archived") }
  ];

  return (
    <div className="overflow-x-auto rounded-lg border shadow py-7 pr-4">
      <div className="inline-block min-w-full align-middle">
        <Board columns={columns} />
      </div>
    </div>
  );
};

export default ClientBoard;

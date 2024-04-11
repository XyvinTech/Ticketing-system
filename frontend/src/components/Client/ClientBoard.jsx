import React, { useState } from "react";

import { ReactComponent as PlusIcon } from "../../assets/icons/PlusIcon.svg";
const Card = ({ card }) => {
  return (
    <div className="flex flex-col p-2 mt-1.5 w-full text-black bg-white rounded shadow-sm">
      <h3 className="text-sm text-stone-700 mb-2">{card.title}</h3>
      <p className="justify-center self-start px-1.5 mt-1.5  text-xs leading-5 bg-red-100 rounded text-rose-950">
        {card.description}
      </p>
    </div>
  );
};

const Column = ({ column, onAddCard }) => {
  return (
    <div className="w-1/4 p-1 ml-1">
      <h2
        className={`flex flex-col flex-1 justify-center self-start px-1 py-.5 text-xs  rounded-xl leading-[186%] max-w-[100px]  mb-2
      ${
        column.title === "Not started"
          ? "bg-red-100 text-cyan-950"
          : column.title === "Archived"
          ? "bg-gray-300 text-zinc-500"
          : column.title === "In progress"
          ? "bg-slate-300 text-cyan-950"
          : column.title === "Done"
          ? "bg-emerald-100 text-emerald-900"
          : ""
      }`}
      >
        {column.title}
      </h2>
      <div className="bg-slate-100 text-white pl-1 pr-4 pt-1 pb-3">
        {column.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        <button className=" flex gap-1.5  text-blue-400 text-xs py-2 px-4 mt-2" onClick={() => onAddCard(column.id)}>
          <PlusIcon />
         <div className="mt-1"> New</div>
        </button>
         
      </div>
    </div>
  );
};

// Board component
const Board = ({ board, onAddCard  }) => {
  return (
    <div className="flex">
      {board.columns.map((column) => (
        <Column key={column.id} column={column} onAddCard={onAddCard} />
      ))}
    </div>
  );
};

// App component
const ClientBoard = () => {
  const [board, setBoard] = useState({
    columns: [
      {
        id: 1,
        title: "Not started",
        cards: [
          { id: 43, title: "DOUBLEHOUSE", description: "High" },
          { id: 50, title: "DOUBLEHOUSE", description: "High" },
          { id: 51, title: "DOUBLEHOUSE", description: "High" },
          { id: 52, title: "DOUBLEHOUSE", description: "High" },
          { id: 53, title: "DOUBLEHOUSE", description: "High" },
        ],
      },
      {
        id: 2,
        title: "In progress",
        cards: [
          { id: 9, title: "DOUBLEHOUSE", description: "High" },
          { id: 10, title: "DOUBLEHOUSE", description: "High" },
          { id: 11, title: "DOUBLEHOUSE", description: "High" },
          { id: 12, title: "DOUBLEHOUSE", description: "High" },
          { id: 13, title: "DOUBLEHOUSE", description: "High" },
        ],
      },
      {
        id: 3,
        title: "Done",
        cards: [
          { id: 14, title: "DOUBLEHOUSE", description: "High" },
          { id: 15, title: "DOUBLEHOUSE", description: "High" },
          { id: 16, title: "DOUBLEHOUSE", description: "High" },
          { id: 17, title: "DOUBLEHOUSE", description: "High" },
          { id: 18, title: "DOUBLEHOUSE", description: "High" },
        ],
      },
      {
        id: 4,
        title: "Archived",
        cards: [
          { id: 19, title: "DOUBLEHOUSE", description: "High" },
          { id: 20, title: "DOUBLEHOUSE", description: "High" },
          { id: 21, title: "DOUBLEHOUSE", description: "High" },
          { id: 22, title: "DOUBLEHOUSE", description: "High" },
          { id: 23, title: "DOUBLEHOUSE", description: "High" },
        ],
      },
    ],
  });
  const handleAddCard = (columnId) => {
    const newCard = { id: Math.random(), title: "DOUBLLEHOUSE", description: "High" };
    const updatedColumns = board.columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    });
    setBoard({
      ...board,
      columns: updatedColumns,
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border shadow py-7 pr-4">
      <div className="inline-block min-w-full align-middle">
        <Board board={board} onAddCard={handleAddCard} />
      </div>
    </div>
  );
};

export default ClientBoard;

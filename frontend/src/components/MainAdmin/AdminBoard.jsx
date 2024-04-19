import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
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
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleAddCardSubmit = () => {
    onAddCard(column.id, newCardTitle);
    setNewCardTitle("");
  };

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
      <div className="bg-slate-100 text-black pl-1 pr-4 pt-1 pb-3">
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {column.cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card card={card} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Enter card title"
            className="px-2 py-1.5 mr-2 border border-gray-300 rounded"
          />
          <button
            className="text-blue-400 text-xs py-2 px-4"
            onClick={handleAddCardSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminBoard = () => {
  const [board, setBoard] = useState({
    columns: [
      {
        id: "notStarted",
        title: "Not started",
        cards: [
          { id: "notStarted1", title: "DOUBLEHOUSE", description: "High" },
          { id: "notStarted2", title: "DOUBLEHOUSE", description: "High" },
          { id: "notStarted3", title: "DOUBLEHOUSE", description: "High" },
          { id: "notStarted4", title: "DOUBLEHOUSE", description: "High" },
          { id: "notStarted5", title: "DOUBLEHOUSE", description: "High" },
        ],
      },
      {
        id: "inProgress",
        title: "In progress",
        cards: [
          { id: "inProgress1", title: "DOUBLEHOUSE", description: "High" },
          { id: "inProgress2", title: "DOUBLEHOUSE", description: "High" },
          { id: "inProgress3", title: "DOUBLEHOUSE", description: "High" },
          { id: "inProgress4", title: "DOUBLEHOUSE", description: "High" },
          { id: "inProgress5", title: "DOUBLEHOUSE", description: "High" },
        ],
      },
      {
        id: "done",
        title: "Done",
        cards: [
          { id: "done1", title: "DOUBLEHOUSE", description: "High" },
          { id: "done2", title: "DOUBLEHOUSE", description: "High" },
          { id: "done3", title: "DOUBLEHOUSE", description: "High" },
          { id: "done4", title: "DOUBLEHOUSE", description: "High" },
          { id: "done5", title: "DOUBLEHOUSE", description: "High" },
        ],
      },
      {
        id: "archived",
        title: "Archived",
        cards: [
          { id: "archived1", title: "DOUBLEHOUSE", description: "High" },
          { id: "archived2", title: "DOUBLEHOUSE", description: "High" },
          { id: "archived3", title: "DOUBLEHOUSE", description: "High" },
          { id: "archived4", title: "DOUBLEHOUSE", description: "High" },
          { id: "archived5", title: "DOUBLEHOUSE", description: "High" },
        ],
      },
    ],
  });

  const handleAddCard = (columnId, title) => {
    const newCard = { id: columnId + Math.random(), title, description: "High" };
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

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    // if dropped in the same list
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = board.columns.find(
      (column) => column.id === source.droppableId
    );
    const destColumn = board.columns.find(
      (column) => column.id === destination.droppableId
    );

    const sourceCards = [...sourceColumn.cards];
    const destCards = [...destColumn.cards];

    const [movedCard] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, movedCard);

    const updatedColumns = board.columns.map((column) => {
      if (column.id === source.droppableId) {
        return {
          ...column,
          cards: sourceCards,
        };
      } else if (column.id === destination.droppableId) {
        return {
          ...column,
          cards: destCards,
        };
      } else {
        return column;
      }
    });

    setBoard({
      ...board,
      columns: updatedColumns,
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border shadow py-7 pr-4">
      <div className="inline-flex">
        <DragDropContext onDragEnd={onDragEnd}>
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onAddCard={handleAddCard}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default AdminBoard;

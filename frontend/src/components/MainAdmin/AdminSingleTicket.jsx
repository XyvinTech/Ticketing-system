import React, { useEffect, useState } from "react";
import TableInfo from "../../ui/TableInfo";
import { ReactComponent as PaperIcon } from "../../assets/icons/PaperIcon.svg";
import AdminConversation from "./AdminConversation";
import { useTicketStore } from "../../store/TicketStore";
import { useParams } from "react-router-dom";
import { useConversationStore } from "../../store/ConversationStore";
import { useAdminStore } from "../../store/AdminStore";
import { updateTicket } from "../../api/ticketapi";

const AdminSingleTicket = () => {
  const { id } = useParams();
  const { fetchTicketById, tickets } = useTicketStore();
  const { conversations, fetchConversationById } = useConversationStore();
  const [isChange, setIsChange] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [markedAsSolved, setMarkedAsSolved] = useState(false);
  const { user } = useAdminStore();
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation dialog visibility

  useEffect(() => {
    fetchTicketById(id);
  }, [id, refresh]);

  useEffect(() => {
    fetchConversationById(id);
  }, [isChange]);

  const confirmMarkAsSolved = async () => {
    setMarkedAsSolved(true);
    await updateTicket(id, { status: "completed" });
    setRefresh(!refresh);
    setShowConfirmation(false); 
  };

  return (
    <>
      <div className="py-6 px-4 sm:p-6 lg:pb-8 space-y-6">
        {tickets && (
          <div key={tickets?._id}>
            <div className="divide-y rounded-lg border shadow mb-6">
              <div className="p-3 ">
                <div className="flex flex-wrap items-center justify-between gap-3 ">
                  <div className="overflow-hidden">
                    <h1 className="mb-6 text-xl font-semibold">
                      {tickets?.subject}
                    </h1>
                    <TableInfo
                      className="overflow-x-auto whitespace-nowrap"
                      reference={tickets?.ticket_Id}
                      priority={tickets?.priority}
                      createdAt={tickets?.createdAt}
                      category={tickets?.department?.departmentName}
                      projectName={tickets?.projectId?.projectName}
                    />
                  </div>
                  <div>
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
                  </div>
                </div>
              </div>
              <div className="px-3 py-5">
                <div
                  className="justify-center text-base leading-7 text-gray-700 max-w-[890px] max-md:pr-5 max-md:max-w-full"
                  dangerouslySetInnerHTML={{ __html: tickets?.description }}
                ></div>
              </div>
              {tickets?.attachment && tickets.attachment.length > 0 && (
                <div className="py-3 pr-3 pl-3">
                  <div className="flex items-center gap-1 font-semibold text-gray-500">
                    <PaperIcon className="h-4 w-4" />
                    <h2>Attachments</h2>
                  </div>
                  <div className="px-4 mt-3 flex flex-wrap gap-3">
                    {tickets?.attachment?.map((item, index) => (
                      <img
                        key={index}
                        src={item}
                        alt={`Attachment ${index}`}
                        className="h-20 w-20 rounded-lg border object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="py-3 pr-3 pl-3">
                <div className="flex justify-end">
                  <input
                    type="checkbox"
                    className="mr-2 accent-purple-500"
                    checked={markedAsSolved}
                    onChange={() => setShowConfirmation(true)}
                    disabled={tickets?.status === "completed"}
                  />
                  <label>Mark as solved</label>
                </div>
              </div>
            </div>
            {conversations?.map((item, index) => (
              <div
                key={item?._id}
                className={`divide-y border shadow bg-gray-50 ${
                  item?.senderId?._id === user?._id ? "text-right" : ""
                } ${index !== conversations.length - 1 ? "mb-4" : ""}`}
                style={{ borderRadius: "10px" }}
              >
                <div className="px-3 py-5">
                  <h1 className="mb-6 text-xl font-semibold text-purple-600">
                    {item?.senderId?.userName}
                  </h1>
                  <div
                    className="text-gray-700 max-md:max-w-full"
                    dangerouslySetInnerHTML={{
                      __html: item.message ? item.message : "",
                    }}
                  ></div>
                  {item?.attachment && item.attachment.length > 0 && (
                    <div className="py-3 pr-3 pl-3">
                      <div
                        className={` mt-3 flex flex-wrap gap-3 ${
                          item?.senderId?._id === user?._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {item.attachment.map((i, index) => (
                          <img
                            key={index}
                            src={i}
                            alt={`Attachment ${index}`}
                            className="h-20 w-20 rounded-lg border object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div
                    className={`text-gray-500 text-sm ${
                      item?.senderId?._id === user?._id
                        ? "text-left"
                        : "text-right"
                    }`}
                  >
                    {" "}
                    {formatDate(item.createdAt)}
                  </div>
                </div>
              </div>
            ))}
            {tickets?.status !== "completed" && (
              <div className="mt-5">
                <AdminConversation
                  ticketId={id}
                  isChange={isChange}
                  setIsChange={setIsChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="text-sm mb-4">
              Are you sure you want to mark this ticket as solved?
            </p>
            <div className="flex justify-end">
              <button
                onClick={confirmMarkAsSolved}
                className="bg-purple-500 text-white px-4 py-2 mr-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false); // Hide confirmation dialog on cancellation
                }}
                className="  px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options).replace(",", "");
  }
};

export default AdminSingleTicket;

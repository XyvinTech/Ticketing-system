import React, { useEffect } from "react";
import TableInfo from "../../ui/TableInfo";

import { ReactComponent as PaperIcon } from "../../assets/icons/PaperIcon.svg";
import Reply from "../../ui/Reply";
import { useParams } from "react-router-dom";
import { useTicketStore } from "../../store/TicketStore";
import { useConversationStore } from "../../store/ConversationStore";
const SingleTicket = () => {
  const { id } = useParams();
  const { fetchTicketById, ticket } = useTicketStore();
  const { fetchConversationById, conversations } = useConversationStore();
  useEffect(() => {
    fetchTicketById(id);
    fetchConversationById(id);
  }, [id]);


  return (
    <>
      <div className="py-6 px-4 sm:p-6 lg:pb-8 space-y-6">
        {ticket && (
          <div key={ticket._id} className="divide-y rounded-lg border shadow">
            <div className="p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <h1 className="mb-6 text-xl font-semibold">
                    {ticket.subject ? ticket.subject : ""}
                  </h1>

                  <TableInfo
                    className="overflow-x-auto whitespace-nowrap"
                    // reference={ticket.reference}
                    priority={ticket.priority}
                    createdAt={ticket.createdAt}
                    category={ticket.category}
                    // last_reply_on={item.replies[0]?.created_at}
                  />
                </div>
                <div>
                  {/* <span
                    className={`rounded-full px-3 py-px text-sm
                      ${
                        item.status === "assigned"
                          ? "bg-indigo-100 text-indigo-800"
                          : item.status === "unassigned"
                          ? "bg-gray-100 text-gray-800"
                          : item.status === "closed"
                          ? "bg-red-100 text-red-800"
                          : item.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
                  >
                    {item.status}
                  </span> */}
                </div>
              </div>
            </div>
            <div className="px-3 py-5">
              <div
                className="justify-center  text-base leading-7 text-gray-700 max-w-[890px] max-md:pr-5 max-md:max-w-full"
                dangerouslySetInnerHTML={{ __html: ticket.description }}
              ></div>
            </div>

            <div className="py-3 pr-3 pl-3">
              <div className="flex items-center gap-1 font-semibold text-gray-500">
                <PaperIcon className="h-4 w-4" />
                <h2>Attachments</h2>
              </div>
              <div className="px-4 mt-3 flex flex-wrap gap-3">
                {ticket.attachment &&
                  ticket.attachment.map((attachment, index) => (
                    <img
                      key={index}
                      src={`http://localhost:4000/uploads/${attachment}`}
                      alt={` ${attachment}`}
                      className="h-20 w-20 rounded-lg border object-cover"
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {conversations &&
          conversations.map((item) => (
            <div key={item._id} className="divide-y rounded-lg border shadow">
              <div className="p-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="overflow-hidden">
                    <h1
                      className="mb-6 text-xl font-semibold text-purple-600"
                      dangerouslySetInnerHTML={{
                        __html: item.message ? item.message : "",
                      }}
                    ></h1>

                    <TableInfo
                      className="overflow-x-auto whitespace-nowrap"
                      // reference={item.reference}
                      priority={item.ticketId ? item.ticketId.priority : ""}
                      createdAt={item.ticketId ? item.ticketId.createdAt : ""}
                      category={item.ticketId ? item.ticketId.category : ""}

                      // last_reply_on={item.replies[0]?.created_at}
                    />
                  </div>
                  <div>
                    {/* <span
                    className={`rounded-full px-3 py-px text-sm
                      ${
                        item.status === "In progress"
                          ? "bg-indigo-100 text-indigo-800"
                         
                          : item.status === "closed"
                          ? "bg-red-100 text-red-800"
                          : item.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
                  >
                    {item.status}
                  </span> */}
                  </div>
                </div>
              </div>
              <div className="px-3 py-5">
                <div
                  className="justify-center  text-base leading-7 text-gray-700 max-w-[890px] max-md:pr-5 max-md:max-w-full"
                  dangerouslySetInnerHTML={{
                    __html: item.message ? item.message : "",
                  }}
                ></div>
              </div>

              <div className="py-3 pr-3 pl-3">
                <div className="flex items-center gap-1 font-semibold text-gray-500">
                  <PaperIcon className="h-4 w-4" />
                  <h2>Attachments</h2>
                </div>
                <div className="px-4 mt-3 flex flex-wrap gap-3">
                  {item.attachment
                    ? item.attachment.map((attachment, index) => (
                        <img
                          key={index}
                          src={`http://localhost:4000/uploads/${attachment}`}
                          alt={` ${attachment}`}
                          className="h-20 w-20 rounded-lg border object-cover"
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          ))}

        <Reply ticketId={id} />
      </div>
    </>
  );
};

export default SingleTicket;

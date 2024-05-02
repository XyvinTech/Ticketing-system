import React, { useEffect, useState } from "react";
import TableInfo from "../../ui/TableInfo";

import { ReactComponent as PaperIcon } from "../../assets/icons/PaperIcon.svg";

import { useTicketStore } from "../../store/TicketStore";
import { useParams } from "react-router-dom";
import { useConversationStore } from "../../store/ConversationStore";
import { useAdminStore } from "../../store/AdminStore";
import ProjectLeadConversation from "./ProjectLeadConversation";

const ProjectLeadSingleTicket = () => {
  const { id } = useParams();
  const { fetchTicketById, tickets } = useTicketStore();
  const { conversations, fetchConversationById } = useConversationStore();
  const [isChange, setIsChange] = useState(false);
  const { user} = useAdminStore();
  useEffect(() => {
    fetchTicketById(id);
  }, [id]);
  useEffect(() => {
    fetchConversationById(id);
  }, [isChange]);
  return (
    <>
      <div className="py-6 px-4 sm:p-6  lg:pb-8 space-y-6">
        {tickets && (
          <div key={tickets?._id} className="divide-y rounded-lg border shadow">
            <div className="p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
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
                    // last_reply_on={item.replies[0]?.created_at}
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
                    {tickets?.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-3 py-5">
              <div
                className="justify-center  text-base leading-7 text-gray-700 max-w-[890px] max-md:pr-5 max-md:max-w-full"
                dangerouslySetInnerHTML={{ __html: tickets?.description }}
              ></div>
            </div>

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
            {conversations?.map((item) => (
              <div key={item?._id} className={`divide-y border shadow ${item?.senderId?._id === user?._id ? 'text-right' : ''}`}>
                <div className="px-3 py-5">
                <h1 className="mb-6 text-xl font-semibold text-purple-600">{item?.senderId?.userName}</h1>
                <div className=" text-gray-700  max-md:max-w-full" dangerouslySetInnerHTML={{ __html: item.message ? item.message : "" }}></div>
              </div>
                {item?.attachment?.map((i, index) => (
                  <div className="py-3 pr-3 pl-3">
                    <div className="flex items-center gap-1 font-semibold text-gray-500">
                      <PaperIcon className="h-4 w-4" />
                      <h2>Attachments</h2>
                    </div>
                    <div className="px-4 mt-3 flex flex-wrap gap-3">
                      <img
                        key={index}
                        src={i}
                        alt={`Attachment ${index}`}
                        className="h-20 w-20 rounded-lg border object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <ProjectLeadConversation
          ticketId={id}
          isChange={isChange}
          setIsChange={setIsChange}
        />
      </div>
    </>
  );
};

export default ProjectLeadSingleTicket;

import React, { useEffect, useState } from "react";
import TableInfo from "../../ui/TableInfo";
import { ReactComponent as PdfIcon } from "../../assets/icons/PdfIcon.svg";
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
  const { user } = useAdminStore();
  useEffect(() => {
    fetchTicketById(id);
  }, [id]);
  useEffect(() => {
    fetchConversationById(id);
  }, [isChange]);
  const handleAttachmentClick = (url) => {
    window.open(url, "_blank");
  };
  const renderAttachment = (item, index) => {
    const isPdf = item.endsWith(".pdf");
    const isVideo =
      item.endsWith(".mp4") || item.endsWith(".webm") || item.endsWith(".ogg");
    if (isPdf) {
      return (
        <div
          key={index}
          className="h-20 w-20 border rounded-lg flex items-center justify-center bg-gray-200 cursor-pointer"
          onClick={() => handleAttachmentClick(item)}
        >
          <PdfIcon className="h-8 w-8 text-red-500" /> {/* Display PDF icon */}
        </div>
      );
    } else if (isVideo) {
      return (
        <video
          key={index}
          controls
          className="h-20 w-20 rounded-lg border object-cover"
        >
          <source src={item} type="video/mp4" />
          <source src={item} type="video/webm" />
          <source src={item} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img
          key={index}
          src={item}
          alt={`Attachment ${index}`}
          className="h-20 w-20 rounded-lg border object-cover cursor-pointer"
          onClick={() => handleAttachmentClick(item)}
        />
      );
    }
  };
  return (
    <>
      <div className="py-6 px-4 sm:p-6  lg:pb-8 space-y-6">
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
                     {tickets?.status === "completed" ? "Closed" : tickets?.status}
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
              {tickets?.attachment && tickets.attachment.length > 0 && (
              <div className="py-3 pr-3 pl-3">
                <div className="flex items-center gap-1 font-semibold text-gray-500">
                  <PaperIcon className="h-4 w-4" />
                  <h2>Attachments</h2>
                </div>
                <div className="px-4 mt-3 flex flex-wrap gap-3">
                {tickets?.attachment?.map((item, index) =>
                      renderAttachment(item, index)
                    )}
                </div>
              </div>)}
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
                      {/* <div className={`flex gap-1 font-semibold text-gray-500 ${
                          item?.senderId?._id === user?._id
                            ? "justify-end"
                            : "justify-start"
                        }`}>
                        <PaperIcon className="h-4 w-4" />
                        <h2>Attachments</h2>
                      </div> */}
                      <div
                        className={` mt-3 flex flex-wrap gap-3 ${
                          item?.senderId?._id === user?._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                       {item.attachment.map((i, index) =>
                          renderAttachment(i, index)
                        )}
                      </div>
                    </div>
                  )}
                  <div className={`text-gray-500 text-sm ${
                  item?.senderId?._id === user?._id ? "text-left" : "text-right"
                }`}> {formatDate(item.createdAt)}</div>
                </div> 
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
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options).replace(',', '');
  }
};

export default ProjectLeadSingleTicket;

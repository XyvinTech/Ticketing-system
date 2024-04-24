import React from "react";
import TableInfo from "../../ui/TableInfo";

import { ReactComponent as PaperIcon } from "../../assets/icons/PaperIcon.svg";
import ProjectLeadConversation from "./ProjectLeadConversation";


const ProjectLeadSingleTicket = () => {
  // Dummy array with mock data
  const dummyArray = [
    {
      id: 1,
      subject: "We have an",
      status: "assigned",
      description: " Installing PHP 8 on your MacBook Air involves a few steps that you can accomplish through the Terminal application. macOS comes with PHP pre-installed, but it might not be the latest version. You have several options to install or update PHP to version 8, including using Homebrew,which is the most popular package manager for macOS.",
      reference: "Reference 1",
      priority: "High",
      createdAt: "2024-03-13T10:00:00Z",
      category: { name: "Category 1" },
      replies: [{ created_at: "2024-03-13T11:00:00Z" }],
      attachments: [
        { id: 1, url: "attachment_url_1" },
        { id: 2, url: "attachment_url_2" }
      ]
    },
  ];
  const replyArray = [
    {
      id: 1,
      subject: "Acute Support",
      status: "In progress",
      description: "Installing PHP 8 on your MacBook Air involves a few steps that you can accomplish through the Terminal application. macOS comes with PHP pre-installed, but it might not be the latest version. You have several options to install or update PHP to version 8, including using Homebrew, which is the most popular package manager for macOS.",
      reference: "Reference 1",
      priority: "High",
      createdAt: "2024-03-13T10:00:00Z",
      category: { name: "Category 1" },
      replies: [{ created_at: "2024-03-13T11:00:00Z" }],
      attachments: [
        { id: 1, url: "attachment_url_1" },
        { id: 2, url: "attachment_url_2" }
      ]
    },
  ];
  return (
    <>
      <div className="py-6 px-4 sm:p-6 lg:pb-8 space-y-6">
        {dummyArray.map((item) => (
          <div key={item.id} className="divide-y rounded-lg border shadow">
            <div className="p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <h1 className="mb-6 text-xl font-semibold">{item.subject}</h1>
                  {/* Pass item properties to TableInfo component */}
                  <TableInfo
                    className="overflow-x-auto whitespace-nowrap"
                    reference={item.reference}
                    priority={item.priority}
                    createdAt={item.createdAt}
                    category={item.category.name}
                    last_reply_on={item.replies[0]?.created_at}
                  />
                </div>
                <div>
                  <span
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
                  </span>
                </div>
              </div>
            </div>
            <div className="px-3 py-5">
              <div className="justify-center  text-base leading-7 text-gray-700 max-w-[890px] max-md:pr-5 max-md:max-w-full">
                {item.description}
              </div>
            </div>
            {/* Render attachments */}
            <div className="py-3 pr-3 pl-3"> 
            <div className="flex items-center gap-1 font-semibold text-gray-500">
          <PaperIcon className="h-4 w-4" />
          <h2>Attachments</h2>
        </div>
            <div className="px-4 mt-3 flex flex-wrap gap-3">
              {item.attachments.map((attachment) => (
                <img
                  key={attachment.id}
                  src={attachment.url}
                  alt={`Attachment ${attachment.id}`}
                  className="h-20 w-20 rounded-lg border object-cover"
                />
              ))}
            </div></div>
            
          </div>
         
        ))} 
         {replyArray.map((item) => (
        
        <div key={item.id} className="divide-y rounded-lg border shadow">
            <div className="p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <h1 className="mb-6 text-xl font-semibold text-purple-600">{item.subject}</h1>
                  {/* Pass item properties to TableInfo component */}
                  <TableInfo
                    className="overflow-x-auto whitespace-nowrap"
                    reference={item.reference}
                    priority={item.priority}
                    createdAt={item.createdAt}
                    category={item.category.name}
                    last_reply_on={item.replies[0]?.created_at}
                  />
                </div>
                <div>
                  <span
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
                  </span>
                </div>
              </div>
            </div>
            <div className="px-3 py-5">
              <div className="justify-center  text-base leading-7 text-gray-700 max-w-[890px] max-md:pr-5 max-md:max-w-full">
                {item.description}
              </div>
            </div>
            {/* Render attachments */}
            <div className="py-3 pr-3 pl-3"> 
            <div className="flex items-center gap-1 font-semibold text-gray-500">
          <PaperIcon className="h-4 w-4" />
          <h2>Attachments</h2>
        </div>
            <div className="px-4 mt-3 flex flex-wrap gap-3">
              {item.attachments.map((attachment) => (
                <img
                  key={attachment.id}
                  src={attachment.url}
                  alt={`Attachment ${attachment.id}`}
                  className="h-20 w-20 rounded-lg border object-cover"
                />
              ))}
            </div></div>
            
          </div>
         ))} 
        
        <ProjectLeadConversation/>
      </div>
    </>
  );
};

export default ProjectLeadSingleTicket;

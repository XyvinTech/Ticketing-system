import React, { useState } from "react";
import StyledTable from "../../ui/StyledTable";

import { ReactComponent as MenuIcon } from "../../assets/icons/MenuHorizontalIcon.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/CalendarIcon.svg";
import { Menu } from "@headlessui/react";
import Pagination from "../../ui/Pagination";

const MemberNotification = () => {
  const [showUnread, setShowUnread] = useState(false);
  const headers = ["Message"];
  const notifications = [
    {
      id: 1,
      message: "Notification 1",
      created_at: "2024-03-12",
      read_at: null, // This indicates unread
    },
    {
      id: 2,
      message: "Notification 2",
      created_at: "2024-03-11",
      read_at: "2024-03-11", // This indicates read
    },
    // Add more notifications as needed
  ];

  // Pagination state for all notifications
  const [allCurrentPage, setAllCurrentPage] = useState(1);
  const allItemsPerPage = 2;

  // Pagination state for unread notifications
  const [unreadCurrentPage, setUnreadCurrentPage] = useState(1);
  const unreadItemsPerPage = 1;

  // Pagination logic for all notifications
  const allIndexOfLastItem = allCurrentPage * allItemsPerPage;
  const allIndexOfFirstItem = allIndexOfLastItem - allItemsPerPage;
  const allCurrentItems = notifications.slice(allIndexOfFirstItem, allIndexOfLastItem);

  // Pagination logic for unread notifications
  const unreadIndexOfLastItem = unreadCurrentPage * unreadItemsPerPage;
  const unreadIndexOfFirstItem = unreadIndexOfLastItem - unreadItemsPerPage;
  const unreadCurrentItems = notifications
    .filter(notification => !notification.read_at)
    .slice(unreadIndexOfFirstItem, unreadIndexOfLastItem);

  // Change page for all notifications
  const allPaginate = (pageNumber) => setAllCurrentPage(pageNumber);

  // Change page for unread notifications
  const unreadPaginate = (pageNumber) => setUnreadCurrentPage(pageNumber);

  // Go to previous page for all notifications
  const goToAllPreviousPage = () => {
    if (allCurrentPage > 1) {
      setAllCurrentPage(allCurrentPage - 1);
    }
  };

  // Go to next page for all notifications
  const goToAllNextPage = () => {
    if (allCurrentPage < Math.ceil(notifications.length / allItemsPerPage)) {
      setAllCurrentPage(allCurrentPage + 1);
    }
  };

  // Go to previous page for unread notifications
  const goToUnreadPreviousPage = () => {
    if (unreadCurrentPage > 1) {
      setUnreadCurrentPage(unreadCurrentPage - 1);
    }
  };

  // Go to next page for unread notifications
  const goToUnreadNextPage = () => {
    if (unreadCurrentPage < Math.ceil(notifications.filter(notification => !notification.read_at).length / unreadItemsPerPage)) {
      setUnreadCurrentPage(unreadCurrentPage + 1);
    }
  };

  return (
    <div className="px-4 py-6 sm:p-6 lg:pb-8">
      <h1 className="mb-6 text-xl font-semibold">Notifications</h1>
      <div className="mb-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3 divide-x divide-dashed text-sm text-gray-500">
            <button
              className={` ${showUnread ? "" : "font-semibold"}`}
              onClick={() => setShowUnread(false)}
            >
              All
            </button>
            <div className="pl-3">
              <button className={` ${!showUnread ? "" : "font-semibold"}`} onClick={() => setShowUnread(true)}>
                Unread Notifications
              </button>
            </div>
          </div>

          <Menu as="div" className="relative flex">
            <Menu.Button>
              <MenuIcon className="h-5 w-5 text-gray-700 hover:text-gray-800" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-5 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item className="w-full cursor-pointer">
                <div className="block w-fit px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mark all as read
                </div>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <StyledTable header={headers}>
        {showUnread ? (
          unreadCurrentItems.map((notification) => (
            <tr key={notification.id}>
              <div className="group flex items-center justify-between gap-12 px-3 py-4 hover:bg-gray-50">
                <div className="text-base">
                  <div className="font-semibold text-purple-600">
                    {notification.message}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span>{notification.created_at}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read_at && (
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  )}
                </div>
              </div>
            </tr>
          ))
        ) : (
          allCurrentItems.map((notification) => (
            <tr key={notification.id}>
              <div className="group flex items-center justify-between gap-12 px-3 py-4 hover:bg-gray-50">
                <div className="text-base">
                  <div className="font-semibold text-purple-600">
                    {notification.message}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span>{notification.created_at}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read_at && (
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  )}
                </div>
              </div>
            </tr>
          ))
        )}
        <tr>
          <td colSpan="2" className="px-4 py-2">
            {showUnread ? (
              <Pagination
                currentPage={unreadCurrentPage}
                totalItems={notifications.filter(notification => !notification.read_at).length}
                itemsPerPage={unreadItemsPerPage}
                paginate={unreadPaginate}
                goToPreviousPage={goToUnreadPreviousPage}
                goToNextPage={goToUnreadNextPage}
              />
            ) : (
              <Pagination
                currentPage={allCurrentPage}
                totalItems={notifications.length}
                itemsPerPage={allItemsPerPage}
                paginate={allPaginate}
                goToPreviousPage={goToAllPreviousPage}
                goToNextPage={goToAllNextPage}
              />
            )}
          </td>
        </tr>
      </StyledTable>
    </div>
  );
};

export default MemberNotification;

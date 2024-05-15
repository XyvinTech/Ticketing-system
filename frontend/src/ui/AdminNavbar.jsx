import React, { useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ReactComponent as MenuIcon } from "../assets/icons/MenuIcon.svg";
import { ReactComponent as BellIcon } from "../assets/icons/BellIcon.svg";
import { ReactComponent as TicketIcon } from "../assets/icons/TicketIcon.svg";
import { ReactComponent as UsersIcon } from "../assets/icons/UsersIcon.svg";
import { ReactComponent as PlusIcon } from "../assets/icons/PlusIcon.svg";
import { ReactComponent as DepartmentIcon } from "../assets/icons/DepartmentIcon.svg";
import { ReactComponent as SquareIcon } from "../assets/icons/SquareIcon.svg";
import Logo from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";
import { useAdminStore } from "../store/AdminStore";
import { useNotificationStore } from "../store/NotificationStore";

const navigation = [{ name: "Tickets", to: "Support/Ticket", current: true }];
const subNavigation = [
  { name: "Tickets", to: "Support/Ticket", icon: TicketIcon },
  { name: "New Ticket", to: "Support/AdminNewTicket", icon: PlusIcon },
  { name: "Department",to: "Support/Department",icon: DepartmentIcon,},
  { name: "Add Project",to: "Support/AddProject",icon: SquareIcon,},
  { name: "Add User",to: "Support/AddUser",icon: UsersIcon,},
  
];
const AdminNavbar = () => {
  const { user, fetchLogin, isChange } = useAdminStore();
  const { notification, fetchNotification,change } = useNotificationStore();

  useEffect(() => {
    fetchNotification();
  }, [change]);
  useEffect(() => {
    fetchLogin();
  }, [isChange]);
  const location = useLocation();
  const unreadNotificationCount = Array.isArray(notification) ? notification.filter((not) => !not.isRead).length : 0;
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <div>
          <div className="mx-auto max-w-7xl px-2 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="mx-auto mb-4 h-5 w-5 "
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                          location.pathname === `/${item.to}`
                            ? "border-purple-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex items-center lg:hidden">
                  <Disclosure.Button className=" inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-1 focus:ring-1  focus:ring-purple-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>

                    {open ? (
                      <MenuIcon className="block h-6 w-6" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  <div className="text-base mr-4 font-medium text-purple-700">
                    {user?.userName}
                  </div>
                  <Link
                    to={"/Support/AdminNotifications"}
                    className="mr-4 block relative rounded-full p-1 text-gray-400 hover:text-purple-500"
                  >
                    <span className="sr-only">View Notification</span>
                    <BellIcon className="h-6 w-6" />
                    {/* Badge */}
                    {unreadNotificationCount > 0 && (
                      <span className="absolute top-0 right-0 bg-purple-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </Link>

                  <Menu as="div" className="relative flex-shrink-0">
                    <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user?.profilePicture}
                        alt=""
                      />
                    </Menu.Button>

                    <Transition
                      as="div"
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/Support/AdminProfile"}
                              className={
                                "block px-4 py-2 text-sm text-gray-700" +
                                (active ? " bg-gray-100" : "")
                              }
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/Support/AdminPassword"}
                              className={
                                "block px-4 py-2 text-sm text-gray-700" +
                                (active ? " bg-gray-100" : "")
                              }
                            >
                              Change Password
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/logout"}
                              className={
                                "block px-4 py-2 text-sm text-gray-700" +
                                (active ? " bg-gray-100" : "")
                              }
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
            {subNavigation.map((item, index) => (
                <Link
                  key={index}
                  to={`/${item.to}`}
                  className={`group flex items-center border-l-4 px-3 py-2 text-sm font-medium ${
                    location.pathname === `/${item.to}`
                      ? "border-purple-500 bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700"
                      : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon className={`-ml-1 h-6 w-6 flex-shrink-0 mr-6 ${
                    location.pathname === `/${item.to}`
                      ? "text-purple-500 group-hover:text-purple-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`} />}
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="mb-3 flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full border object-cover"
                    src={user?.profilePicture}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.userName}
                  </div>
                  <div className="text-sm font-medium text-gray-500 mr-10">
                    {user?.email}
                  </div>
                </div>

                <span className="sr-only">View notifications</span>
                <Link to={"/Support/AdminNotifications"}>
                  {" "}
                  <BellIcon className="h-6 w-6" />
                </Link>
              </div>

              <div className="space-y-1">
                <Link
                  to={"/Support/AdminProfile"}
                  className="block  py-2 text-sm text-gray-700"
                >
                  <Disclosure.Button className="w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    Profile
                  </Disclosure.Button>
                </Link>
                <Link
                  to={"/Support/AdminPassword"}
                  className="block  py-2 text-sm text-gray-700"
                >
                  <Disclosure.Button className="w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    Change Password
                  </Disclosure.Button>
                </Link>
                <Link
                  to={"/logout"}
                  className="block  py-2 text-sm text-gray-700"
                >
                  <Disclosure.Button className="w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    Logout
                  </Disclosure.Button>
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default AdminNavbar;

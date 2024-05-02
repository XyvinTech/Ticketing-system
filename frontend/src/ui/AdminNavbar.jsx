import React, { useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ReactComponent as MenuIcon } from "../assets/icons/MenuIcon.svg";
import { ReactComponent as BellIcon } from "../assets/icons/BellIcon.svg";
import Logo from "../assets/Logo.png";
import { ReactComponent as SearchIcon } from "../assets/icons/SearchIcon.svg";
import { Link, useLocation } from "react-router-dom";
import { useAdminStore } from "../store/AdminStore";

const navigation = [{ name: "Tickets", to: "Admin/Ticket", current: true }];

const AdminNavbar = () => {
  const { user, fetchLogin ,isChange} = useAdminStore();
  useEffect(() => {
    fetchLogin();
  }, [isChange]);
  const location = useLocation();
  
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <div>
          <div className="mx-auto max-w-7xl px-2 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                <img src={Logo} alt="Logo" className="mx-auto mb-4 h-5 w-5 "/>
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
                  <button
                    type="button"
                    className="mr-4 block rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">search</span>
                    <SearchIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
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
                  
                  <Link
                    to={"/Admin/AdminNotifications"}
                    className="mr-4 block rounded-full p-1 text-gray-400 hover:text-purple-500 "
                  >
                    <span className="sr-only">View Notification</span>
                    <BellIcon className="h-6 w-6" />
                  </Link>
                  <Menu as="div" className="relative flex-shrink-0">
                    <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user?.profilePicture}alt=""
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
                              to={"/Admin/AdminProfile"}
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
                              to={"/Admin/AdminPassword"}
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
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    "block w-full text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 py-2 pl-3 pr-4 text-left text-base font-medium" +
                    (item.current
                      ? " border-l-4 border-l-purple-500 bg-purple-50 text-puurple-700  "
                      : "")
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
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
                <Link to={"/Admin/AdminNotifications"}>
                  {" "}
                  <BellIcon className="h-6 w-6" />
                </Link>
              </div>

              <div className="space-y-1">
                <Link
                  to={"/Admin/AdminProfile"}
                  className="block  py-2 text-sm text-gray-700"
                >
                  <Disclosure.Button className="w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    Profile
                  </Disclosure.Button>
                </Link>
                <Link
                  to={"/Admin/AdminPassword"}
                  className="block  py-2 text-sm text-gray-700"
                >
                  <Disclosure.Button className="w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    Change Password
                  </Disclosure.Button>
                </Link>
                <Link to={"/logout"} className="block  py-2 text-sm text-gray-700">
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

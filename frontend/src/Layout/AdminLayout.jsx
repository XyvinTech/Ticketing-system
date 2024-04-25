import React from "react";
import { ReactComponent as TicketIcon } from "../assets/icons/TicketIcon.svg";
import { ReactComponent as UsersIcon } from "../assets/icons/UsersIcon.svg";
import { ReactComponent as PlusIcon } from "../assets/icons/PlusIcon.svg";
import { Link, useLocation } from "react-router-dom";
import Footer from "../ui/Footer";
import AdminNavbar from "../ui/AdminNavbar";

const SubNavigation = () => {
  const location = useLocation();
  const subNavigation = [
    { name: "Tickets", to: "Admin/Ticket", icon: TicketIcon },
    { name: "New Ticket", to: "Admin/AdminNewTicket", icon: PlusIcon },
    { name: "Department",to: "Admin/Department",icon: UsersIcon,},
    { name: "Add Member",to: "Admin/AddPeople",icon: UsersIcon,},
    { name: "Add Project",to: "Admin/AddProject",icon: UsersIcon,},
    { name: "Add User",to: "Admin/AddUser",icon: UsersIcon,},
    
  ];

  return (
    <nav className="space-y-1">
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
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              {
                <item.icon
                  className={`-ml-1 h-6 w-6 flex-shrink-0 ${
                    location.pathname === `/${item.to}`
                      ? "text-purple-500 group-hover:text-purple-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
              }
              <div className="truncate">{item.name}</div>
            </div>
          </div>
        </Link>
      ))}
    </nav>
  );
};
const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <AdminNavbar />
      <div className="my-6 flex-1">
        <div className="mx-auto max-w-8xl px-9">
          <div className="rounded-lg border bg-white shadow">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x ">
              <aside className="py-6 lg:col-span-2">
                <SubNavigation />
              </aside>
              <div className="divide-y divide-gray-200 lg:col-span-10">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminLayout;

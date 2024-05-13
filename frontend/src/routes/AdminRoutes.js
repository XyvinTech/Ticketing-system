import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import AdminTicket from "../components/MainAdmin/AdminTicket";
import AdminProfile from "../components/MainAdmin/AdminProfile";
import AdminPassword from "../components/MainAdmin/AdminPassword";
import AdminNotification from "../components/MainAdmin/AdminNotification";
import AdminDepartment from "../components/MainAdmin/AdminDepartment";
import AdminNewTicket from "../components/MainAdmin/AdminNewTicket";
import AdminSingleTicket from "../components/MainAdmin/AdminSingleTicket";
import AdminAddProject from "../components/MainAdmin/AdminAddProject";
import AdminAddUser from "../components/MainAdmin/AdminAddUser";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminTicket />} />
        <Route path="AdminNewTicket" element={<AdminNewTicket />} />
        <Route path="SingleTicket/:id" element={<AdminSingleTicket />} />
        <Route path="Department" element={<AdminDepartment />} />
        <Route path="AdminProfile" element={<AdminProfile />} />
        <Route path="AdminPassword" element={<AdminPassword />} />
        <Route path="AdminNotifications" element={<AdminNotification />} />
        <Route path="AddProject" element={<AdminAddProject />} />
        <Route path="AddUser" element={<AdminAddUser />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;

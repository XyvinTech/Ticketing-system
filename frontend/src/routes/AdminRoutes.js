import { Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import AdminTicket from "../components/MainAdmin/AdminTicket";
import AdminProfile from "../components/MainAdmin/AdminProfile";
import AdminPassword from "../components/MainAdmin/AdminPassword";
import AdminNotification from "../components/MainAdmin/AdminNotification";
import AdminAddPeople from "../components/MainAdmin/AdminAddPeople";
import AdminDepartment from "../components/MainAdmin/AdminDepartment";
import AdminNewTicket from "../components/MainAdmin/AdminNewTicket";
import AdminSingleTicket from "../components/MainAdmin/AdminSingleTicket";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/Ticket" element={<AdminTicket />} />
        <Route path="AdminNewTicket" element={<AdminNewTicket />} />
        <Route path="SingleTicket/" element={<AdminSingleTicket />} />
        <Route path="Department" element={<AdminDepartment />} />
        <Route path="AdminProfile" element={<AdminProfile />} />
        <Route path="AdminPassword" element={<AdminPassword />} />
        <Route path="AdminNotifications" element={<AdminNotification />} />
        <Route path="Addpeople" element={<AdminAddPeople />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;

import { Route, Routes } from "react-router-dom";
import MemberLayout from "../Layout/MemberLayout";
import MemberTicket from "../components/Member/MemberTicket";
import MemberProfile from "../components/Member/MemberProfile";
import MemberNotification from "../components/Member/MemberNotification";
import MemberPassword from "../components/Member/MemberPassword";
import MemberSingleTicket from "../components/Member/MemberSingleTicket";

const MemberRoutes = () => {
  return (
    <MemberLayout>
      <Routes>
        <Route path="/Ticket" element={<MemberTicket />} />
        <Route path="Profile" element={<MemberProfile />} />
        <Route path="Notification" element={<MemberNotification />} />
        <Route path="Password" element={<MemberPassword />} />
        <Route path="SingleTicket/:id" element={<MemberSingleTicket />} />
      </Routes>
    </MemberLayout>
  );
};

export default MemberRoutes;

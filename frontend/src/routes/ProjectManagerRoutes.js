
import { Route, Routes } from "react-router-dom";
import ManagerLayout from "../Layout/ManagerLayout";
import ManagerTicket from "../components/ProjectManager/ManagerTicket";
import ManagerPassword from "../components/ProjectManager/ManagerPassword";
import ManagerProfile from "../components/ProjectManager/ManagerProfile";
import AddPeople from "../components/ProjectManager/AddPeople";
import ManagerNewTicket from "../components/ProjectManager/ManagerNewTicket";
import ManagerNotification from "../components/ProjectManager/ManagerNotification";
import ManagerSingleTicket from "../components/ProjectManager/ManagerSingleTicket";

const ProjectManagerRoutes = () => {
  return (
    <ManagerLayout>
      <Routes>
        <Route path="/Ticket" element={<ManagerTicket />} />
        <Route path="ManagerPassword" element={<ManagerPassword />} />
        <Route path="AddPeople" element={<AddPeople />} />
        <Route path="ManagerProfile" element={<ManagerProfile />} />
        <Route path="ManagerNotification" element={<ManagerNotification />} />
        <Route path="ManagerSingleTicket" element={<ManagerSingleTicket />} />
        <Route path="ManagerNewTicket" element={<ManagerNewTicket />} />
      </Routes>
    </ManagerLayout>
  );
};

export default ProjectManagerRoutes;

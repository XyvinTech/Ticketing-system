
import { Route, Routes } from "react-router-dom";
import ProjectLeadLayout from "../Layout/ProjectLeadLayout";
import ProjectLeadTicket from "../components/ProjectLead/ProjectLeadTicket";
import ProjectLeadSingleTicket from "../components/ProjectLead/ProjectLeadSingleTicket";
import ProjectLeadNotification from "../components/ProjectLead/ProjectLeadNotification";
import ProjectLeadPassword from "../components/ProjectLead/ProjectLeadPassword";
import ProjectLeadProfile from "../components/ProjectLead/ProjectLeadProfile";
import ProjectLeadAddPeople from "../components/ProjectLead/ProjectLeadAddPeople";
import ProjectLeadNewTicket from "../components/ProjectLead/ProjectLeadNewTicket";


const ProjectManagerRoutes = () => {
  return (
    <ProjectLeadLayout>
      <Routes>
        <Route path="/Ticket" element={<ProjectLeadTicket />} />
        <Route path="/Password" element={<ProjectLeadPassword />} />
        <Route path="AddPeople" element={<ProjectLeadAddPeople />} />
        <Route path="Profile" element={<ProjectLeadProfile/>} />
        <Route path="/Notification" element={<ProjectLeadNotification />} />
        <Route path="/SingleTicket/:id" element={<ProjectLeadSingleTicket />} />
        <Route path="NewTicket" element={<ProjectLeadNewTicket />} />
      </Routes>
    </ProjectLeadLayout>
  );
};

export default ProjectManagerRoutes;

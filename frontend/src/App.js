import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ClientTicket from "./components/Client/ClientTicket";
import ClientNewTicket from "./components/Client/ClientNewTicket";
import ClientProfile from "./components/Client/ClientProfile";
import ClientPassword from "./components/Client/ClientPassword";
import ClientNotification from "./components/Client/ClientNotification";
import RegisterForm from "./pages/RegisterForm";
import SingleTicket from "./components/Client/SingleTicket";
import ManagerLayout from "./Layout/ManagerLayout";
import ManagerTicket from "./components/ProjectManager/ManagerTicket";
import ManagerPassword from "./components/ProjectManager/ManagerPassword";
import ManagerProfile from "./components/ProjectManager/ManagerProfile";
import AddPeople from "./components/ProjectManager/AddPeople";
import ManagerNewTicket from "./components/ProjectManager/ManagerNewTicket";
import ManagerNotification from "./components/ProjectManager/ManagerNotification";
import ManagerSingleTicket from "./components/ProjectManager/ManagerSingleTicket";
import MemberLayout from "./Layout/MemberLayout";
import MemberTicket from "./components/Member/MemberTicket";
import MemberProfile from "./components/Member/MemberProfile";
import MemberNotification from "./components/Member/MemberNotification";
import MemberPassword from "./components/Member/MemberPassword";
import MemberSingleTicket from "./components/Member/MemberSingleTicket";
import ClientLayout from "./Layout/ClientLayout";

function App() {
  return (
    <>
      <div class="flex min-h-screen flex-col bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<RegisterForm />} />
          <Route
            path="/Client/Ticket/*"
            element={
              <ClientLayout>
                <Routes>
                  <Route path="/" element={<ClientTicket />} />
                  <Route path="ClientNewTicket" element={<ClientNewTicket />} />
                  <Route path="SingleTicket" element={<SingleTicket />} />
                  <Route path="ClientProfile" element={<ClientProfile />} />
                  <Route path="ClientPassword" element={<ClientPassword />} />
                  <Route path="ClientNotifications" element={<ClientNotification />} />
                </Routes>
              </ClientLayout>
            }
          />
          <Route
            path="/ProjectManager/*"
            element={
              <ManagerLayout>
                <Routes>
                  <Route path="/Ticket" element={<ManagerTicket />} />
                  <Route path="/ManagerPassword" element={<ManagerPassword />} />
                  <Route path="/AddPeople" element={<AddPeople />} />
                  <Route path="/ManagerProfile" element={<ManagerProfile />} />
                  <Route path="/ManagerNotification" element={<ManagerNotification />} />
                  <Route path="/ManagerSingleTicket" element={<ManagerSingleTicket />} />
                  <Route path="/ManagerNewTicket" element={<ManagerNewTicket />} />
                </Routes>
              </ManagerLayout>
            }
          />
          <Route
            path="/Member/*"
            element={
              <MemberLayout>
                <Routes>
                  <Route path="/Ticket" element={<MemberTicket />} />
                  <Route path="/Profile" element={<MemberProfile />} />
                  <Route path="/Notification" element={<MemberNotification />} />
                  <Route path="/Password" element={<MemberPassword />} />
                  <Route path="/SingleTicket" element={<MemberSingleTicket />} />
                </Routes>
              </MemberLayout>
            }
          />
        </Routes>
      </div>{" "}
    </>
  );
}

export default App;

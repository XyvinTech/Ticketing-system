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
            path="/Client/Ticket"
            element={
              <ClientLayout>
                <ClientTicket />
              </ClientLayout>
            }
          />
          <Route
            path="/Client/Ticket/ClientNewTicket"
            element={
              <ClientLayout>
                <ClientNewTicket />
              </ClientLayout>
            }
          />
          <Route
            path="/Client/Ticket/SingleTicket"
            element={
              <ClientLayout>
                <SingleTicket />
              </ClientLayout>
            }
          />
          <Route
            path="/Client/Ticket/ClientProfile"
            element={
              <ClientLayout>
                <ClientProfile />
              </ClientLayout>
            }
          />
          <Route
            path="/Client/Ticket/ClientPassword"
            element={
              <ClientLayout>
                <ClientPassword />
              </ClientLayout>
            }
          />
          <Route
            path="/Client/Ticket/ClientNotifications"
            element={
              <ClientLayout>
                <ClientNotification />
              </ClientLayout>
            }
          />
          <Route
            path="/ProjectManager/Ticket"
            element={
              <ManagerLayout>
                <ManagerTicket />
              </ManagerLayout>
            }
          />
          <Route
            path="/ProjectManager/ManagerPassword"
            element={
              <ManagerLayout>
                <ManagerPassword />
              </ManagerLayout>
            }
          />
          <Route
            path="/ProjectManager/AddPeople"
            element={
              <ManagerLayout>
                <AddPeople />
              </ManagerLayout>
            }
          />
          <Route
            path="/ProjectManager/ManagerProfile"
            element={
              <ManagerLayout>
                <ManagerProfile />
              </ManagerLayout>
            }
          />
          <Route
            path="/ProjectManager/ManagerNotification"
            element={
              <ManagerLayout>
                <ManagerNotification />
              </ManagerLayout>
            }
          />
          <Route
            path="/ProjectManager/SingleTicket"
            element={
              <ManagerLayout>
                <ManagerSingleTicket />
              </ManagerLayout>
            }
          />
          <Route
            path="/ProjectManager/ManagerNewTicket"
            element={
              <ManagerLayout>
                <ManagerNewTicket />
              </ManagerLayout>
            }
          />
          <Route
            path="/Member/Ticket"
            element={
              <MemberLayout>
                <MemberTicket />
              </MemberLayout>
            }
          />
          <Route
            path="/Member/Profile"
            element={
              <MemberLayout>
                <MemberProfile />
              </MemberLayout>
            }
          />
          <Route
            path="/Member/Notification"
            element={
              <MemberLayout>
                <MemberNotification />
              </MemberLayout>
            }
          />
          <Route
            path="/Member/Password"
            element={
              <MemberLayout>
                <MemberPassword />
              </MemberLayout>
            }
          />
          <Route
            path="/Member/SingleTicket"
            element={
              <MemberLayout>
                <MemberSingleTicket />
              </MemberLayout>
            }
          />
        </Routes>
      </div>{" "}
    </>
  );
}

export default App;

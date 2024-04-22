
import { Route, Routes } from "react-router-dom";
import ClientLayout from "../Layout/ClientLayout";
import ClientTicket from "../components/Client/ClientTicket";
import ClientNewTicket from "../components/Client/ClientNewTicket";
import SingleTicket from "../components/Client/SingleTicket";
import ClientProfile from "../components/Client/ClientProfile";
import ClientPassword from "../components/Client/ClientPassword";
import ClientNotification from "../components/Client/ClientNotification";

const ClientRoutes = () => {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/" element={<ClientTicket />} />
        <Route path="ClientNewTicket" element={<ClientNewTicket />} />
        <Route path="SingleTicket/:id" element={<SingleTicket />} />
        <Route path="ClientProfile" element={<ClientProfile />} />
        <Route path="ClientPassword" element={<ClientPassword />} />
        <Route path="ClientNotifications" element={<ClientNotification />} />
      </Routes>
    </ClientLayout>
  );
};

export default ClientRoutes;

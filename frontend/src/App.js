import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RegisterForm from "./pages/RegisterForm";
import AdminRoutes from "./routes/AdminRoutes";
import MemberRoutes from "./routes/MemberRoutes";
import ProjectManagerRoutes from "./routes/ProjectManagerRoutes";
import ProjectLead from "./routes/ProjectLead";
import ClientRoutes from "./routes/ClientRoutes";
import { Logout } from "./utils/Logout";
import { RequireAuth } from './utils/Auth';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/Admin/*" element={<RequireAuth><AdminRoutes /></RequireAuth>} />
        <Route path="/Client/Ticket/*" element={<ClientRoutes />} />
        <Route path="/ProjectManager/*" element={<ProjectManagerRoutes />} />
        <Route path="/ProjectLead/*" element={<ProjectLead />} />
        <Route path="/Member/*" element={<MemberRoutes />} />
      </Routes>
    </>
  );
}

export default App;

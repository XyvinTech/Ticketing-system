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
        <Route path="/Client/Ticket/*" element={<RequireAuth><ClientRoutes /></RequireAuth>} />
        <Route path="/Manager/*" element={<RequireAuth><ProjectManagerRoutes /></RequireAuth>} />
        <Route path="/ProjectLead/*" element={<RequireAuth><ProjectLead /></RequireAuth>} />
        <Route path="/Member/*" element={<RequireAuth><MemberRoutes /></RequireAuth>} />
      </Routes>
    </>
  );
}

export default App;

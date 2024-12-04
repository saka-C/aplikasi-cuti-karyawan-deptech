import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Notfound from "./pages/Notfound";
import DashboardHome from "./pages/DashboardHome";
import PegawaiPage from "./pages/PegawaiPage";
import ListAdminPage from "./pages/ListAdminPage";
import AddPegawai from "./pages/AddPegawai";
import RequestLeave from "./pages/RequestLeave";
import ViewPegawai from "./pages/ViewPegawai";
import AddAdmin from "./pages/AddAdmin";
import ViewAdmin from "./pages/ViewAdmin";
import ProtectedRoute from "./functions/ProtectedRoute";
import History from "./pages/History";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="pegawai" element={<PegawaiPage />} />
          <Route path="requestleave" element={<RequestLeave />} />
          <Route path="request-leave/:id" element={<RequestLeave />} />
          <Route path="add-pegawai" element={<AddPegawai />} />
          <Route path="add-admin" element={<AddAdmin />} />
          <Route path="admin" element={<ListAdminPage />} />
          <Route path="history" element={<History />} />
          <Route path="view-pegawai/:id" element={<ViewPegawai />} />
          <Route path="view-admin/:id" element={<ViewAdmin />} />
        </Route>
        
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;

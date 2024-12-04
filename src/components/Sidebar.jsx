import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import "boxicons";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminId");
    localStorage.removeItem("token");
    navigate("/");
  };


  const isActiveLink = (path) => location.pathname === path ? "bg-slate-100 text-gray-900" : "text-gray-400";

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl text-slate-500 w-64 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <h1 className="text-xl font-bold p-4 border-b border-slate-300">Pengajuan Cuti</h1>
        <nav className="flex flex-col px-4 mt-5 space-y-2">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 py-4 px-3 rounded-2xl hover:bg-slate-100 ${isActiveLink("/dashboard")}`}
          >
            <box-icon name="tachometer" color="rgb(156 163 175 / var(--tw-text-opacity, 1))"></box-icon>
            <span>Dashboard</span>
          </Link>
          <Link
            to="/dashboard/pegawai"
            className={`flex items-center space-x-3 py-4 px-3 rounded-2xl hover:bg-slate-100 ${isActiveLink("/dashboard/pegawai")}`}
          >
            <box-icon name="user" color="rgb(156 163 175 / var(--tw-text-opacity, 1))"></box-icon>
            <span>Pegawai</span>
          </Link>
          <Link
            to="/dashboard/requestleave"
            className={`flex flex-col py-4 px-3 rounded-2xl hover:bg-slate-100 ${isActiveLink("/dashboard/requestleave")}`}
          >
            <div className="flex items-center space-x-3">
              <box-icon name="notepad" color="rgb(156 163 175 / var(--tw-text-opacity, 1))"></box-icon>
              <span>Pengajuan Cuti</span>
            </div>
            <div className="flex justify-end mt-2"><span className="border-primary-500 text-primary-500 font-medium border rounded-lg text-[11px] px-2">Disarankan</span></div>
          </Link>
          <Link
            to="/dashboard/history"
            className={`flex items-center space-x-3 py-4 px-3 rounded-2xl hover:bg-slate-100 ${isActiveLink("/dashboard/history")}`}
          >
            <box-icon name="history" color="rgb(156 163 175 / var(--tw-text-opacity, 1))"></box-icon>
            <span>History Cuti</span>
          </Link>
          <Link
            to="/dashboard/admin"
            className={`flex items-center space-x-3 py-4 px-3 rounded-2xl hover:bg-slate-100 ${isActiveLink("/dashboard/admin")}`}
          >
            <box-icon name="user-circle" color="rgb(156 163 175 / var(--tw-text-opacity, 1))"></box-icon>
            <span>Admin</span>
          </Link>
          <button
            className="flex items-center space-x-3 text-gray-400 bg-white py-4 px-3 rounded-2xl hover:bg-red-100"
            onClick={handleLogout}
          >
            <box-icon name="log-out" color="rgb(156 163 175 / var(--tw-text-opacity, 1))"></box-icon>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <button
        className={`fixed top-4 z-50 text-gray-700 transform transition-transform duration-300 ${
          isOpen ? "translate-x-64" : "translate-x-4"
        } lg:hidden`}
        onClick={toggleSidebar}
      >
        <box-icon name={isOpen ? "x" : "menu"} size="md"></box-icon>
      </button>

      <div className="flex-1 p-4 lg:ml-64">{children}</div>
    </div>
  );
};

export default Sidebar;

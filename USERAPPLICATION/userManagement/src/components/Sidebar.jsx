import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  KeyRound,
  Building2,
  Layers,
  GraduationCap,
  LogOut
  // PanelLeftClose,
  // PanelLeftOpen,
} from "lucide-react";
import logo from "../assets/image.png"; // update path if needed
import "../css/Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-header">

          {!collapsed && (
            <div className="sidebar-brand">
              <img src={logo} alt="UniqueHire Logo" className="sidebar-logo" />
              <h1>uniquehire</h1>
            </div>
          )}

          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}>

            {/* <img src={logo} alt="toggle" className="toggle-logo" /> */}
          </button>
        </div>

        <nav className="sidebar-menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "side-link active" : "side-link"
            }
          >
            <LayoutDashboard size={22} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "side-link active" : "side-link"
            }
          >
            <Users size={22} />
            {!collapsed && <span>Users</span>}
          </NavLink>

          <NavLink
            to="/roles"
            className={({ isActive }) =>
              isActive ? "side-link active" : "side-link"
            }
          >
            <Shield size={22} />
            {!collapsed && <span>Roles</span>}
          </NavLink>

          <NavLink
            to="/permissions"
            className={({ isActive }) =>
              isActive ? "side-link active" : "side-link"
            }
          >
            <KeyRound size={22} />
            {!collapsed && <span>Permissions</span>}
          </NavLink>

          <NavLink
          to="/organizations"
          className={({ isActive }) =>
            isActive ? "side-link active" : "side-link"
          }
          >
            <Building2 size={22} />
            {!collapsed && <span>Organization</span>}
          </NavLink>

          <NavLink
          to="/department"
          className={({ isActive }) =>
            isActive ? "side-link active" : "side-link"
          }
          >
            <Layers size={22} />
            {!collapsed && <span>Department</span>}
          </NavLink>

          <NavLink
          to="/training"
          className={({ isActive }) =>
            isActive ? "side-link active" : "side-link"
          }
          >
            <GraduationCap size={22} />
            {!collapsed && <span>Trainings</span>}
          </NavLink>
        </nav>
      </div>
      <div className="sidebar-logout" onClick={handleLogout}>
      <LogOut size={22} />
      {!collapsed && <span>Logout</span>}
    </div>

    </aside>
  );
}

export default Sidebar;
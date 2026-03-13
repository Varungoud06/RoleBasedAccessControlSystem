import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {
  ShieldCheck,
  Users,
  Settings,
  LifeBuoy,
  CalendarCheck
} from "lucide-react";
import "../css/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Security",
      desc: "Manage your account security and change your password.",
      button: "Change Password",
      cls: "purple-card",
      icon: <ShieldCheck size={30} />
    },
    {
      title: "Team",
      desc: "Manage your team members and collaborators.",
      button: "Coming Soon",
      cls: "pink-card",
      icon: <Users size={30} />
    },
    {
      title: "Settings",
      desc: "Configure your theme preferences with dark mode and light mode.",
      button: "Open Settings",
      cls: "blue-card",
      icon: <Settings size={30} />,
      path: "/settings"
    },
    {
      title: "Support",
      desc: "Get help and contact customer support.",
      button: "Coming Soon",
      cls: "purple-card",
      icon: <LifeBuoy size={30} />
    },
    {
      title: "Attendance",
      desc: "Access and manage your attendance records.",
      button: "Open Attendance",
      cls: "pink-card",
      icon: <CalendarCheck size={30} />,
      path: "/attendance"
    }
  ];

  const handleCardAction = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar title="Dashboard" />

        <div className="dashboard-content">
          <div className="dashboard-grid">
            {cards.map((item, index) => (
              <div className="dashboard-card" key={index}>
                <div className={`dash-icon ${item.cls}`}>{item.icon}</div>

                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <button onClick={() => handleCardAction(item)}>
                  {item.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
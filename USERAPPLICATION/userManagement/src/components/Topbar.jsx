import { useState } from "react";
import { User, Bell, X } from "lucide-react";
import "../css/Topbar.css";

function Topbar({ title }) {

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="topbar">

      <h2>{title}</h2>

      <div className="topbar-right">

        <div className="topbar-notification">
          <Bell
            size={22}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
          />
          <span className="notification-dot"></span>

          {showNotifications && (
            <div className="notification-panel">

              <div className="notification-header">
                <h4>Notifications</h4>
                <X
                  size={18}
                  className="close-icon"
                  onClick={() => setShowNotifications(false)}
                />
              </div>

              <div className="notification-body">
                <p>No notifications yet</p>
              </div>

            </div>
          )}
        </div>

        <div className="topbar-user">
          <User
            size={22}
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          />

          {showProfile && (
            <div className="profile-panel">

              <div className="profile-header">
                <User size={40} />
                <div>
                  <h4>User Name</h4>
                  <p>Admin</p>
                </div>
                {/* <X
                  size={18}
                  className="close-icon"
                  onClick={() => setShowNotifications(false)}
                /> */}
              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Topbar;
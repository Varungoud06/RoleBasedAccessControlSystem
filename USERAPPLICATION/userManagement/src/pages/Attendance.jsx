import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/Attendance.css";

function Attendance() {
  const attendanceList = [];

  return (
    <div className="attendance-layout">
      <Sidebar />

      <main className="attendance-main">
        <Topbar title="Attendance" />

        <div className="attendance-content">
          <div className="attendance-table-wrap">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Org</th>
                  <th>Dept</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendanceList.length > 0 ? (
                  attendanceList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.employee}</td>
                      <td>{item.org}</td>
                      <td>{item.dept}</td>
                      <td>{item.date}</td>
                      <td>{item.checkIn}</td>
                      <td>{item.checkOut}</td>
                      <td>{item.hours}</td>
                      <td>
                        <span className={`attendance-status ${item.status?.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No attendance records available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Attendance;
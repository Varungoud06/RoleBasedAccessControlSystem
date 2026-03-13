import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import "../css/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    role: "User",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.address ||
      !formData.role 
    ) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      id: users.length + 1,
      ...formData,
    };

    setUsers((prev) => [...prev, newUser]);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
      role: "User",
      status: "Active",
    });

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="users-layout">
      <Sidebar />
      <div className="users-main">
        <Topbar title="Users" />

        <div className="users-content">
          <div className="users-toolbar">
            <div className="users-search">
              <Search size={22} />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="users-add-btn" onClick={() => setShowModal(true)}>
              <Plus size={20} />
              Add New User
            </button>
          </div>

          <div className="users-table-wrap">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Created By</th>
                  <th>Updated By</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.address}</td>
                      <td>{user.role}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.updatedAt}</td>
                      <td>{user.createdBy}</td>
                      <td>{user.updatedBy}</td>
                      <td>
                        <div className="table-actions">
                          <Pencil size={19} className="edit-icon" />
                          <Trash2
                            size={19}
                            className="delete-icon"
                            onClick={() => handleDelete(user.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="no-data">
                      No users added yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="user-modal-overlay">
            <div className="user-modal">
              <div className="user-modal-header">
                <h2>Add New User</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <form className="user-form" onSubmit={handleAddUser}>
                <div className="form-grid">
                  <div>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option  value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">Developer</option>
                      <option value="User">HR</option>
                    </select>
                  </div>
                </div>

                <div className="user-form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
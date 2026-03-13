// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
// import "../css/Roles.css";

// function Roles() {
//   const [roles, setRoles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const permissionOptions = ["Create_User", "Update_User", "Delete_User"];

//   const [formData, setFormData] = useState({
//     roleName: "",
//     description: "",
//     permissions: [],
//     status: "Active",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handlePermissionChange = (permission) => {
//     setFormData((prev) => {
//       const alreadySelected = prev.permissions.includes(permission);

//       return {
//         ...prev,
//         permissions: alreadySelected
//           ? prev.permissions.filter((item) => item !== permission)
//           : [...prev.permissions, permission],
//       };
//     });
//   };

//   const handleAddRole = (e) => {
//     e.preventDefault();

//     if (!formData.roleName || !formData.description || formData.permissions.length === 0 || !formData.status) {
//       alert("Please fill all fields");
//       return;
//     }

//     const currentDate = new Date().toLocaleString();

//     const newRole = {
//       id: roles.length + 1,
//       roleName: formData.roleName,
//       description: formData.description,
//       permissions: formData.permissions,
//       status: formData.status,
//     };

//     setRoles((prev) => [...prev, newRole]);

//     setFormData({
//       roleName: "",
//       description: "",
//       permissions: [],
//       status: "Active",
//     });

//     setShowModal(false);
//   };

//   const handleDelete = (id) => {
//     setRoles((prev) => prev.filter((role) => role.id !== id));
//   };

//   const filteredRoles = roles.filter((role) =>
//     `${role.roleName} ${role.description} ${role.permissions.join(" ")} ${role.createdBy} ${role.status}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div className="roles-layout">
//       <Sidebar />

//       <div className="roles-main">
//         <Topbar title="Roles" />

//         <div className="roles-content">
//           <div className="roles-toolbar">
//             <div className="roles-search">
//               <Search size={22} />
//               <input
//                 type="text"
//                 placeholder="Search roles..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>

//             <button className="roles-add-btn" onClick={() => setShowModal(true)}>
//               <Plus size={20} />
//               Add New Role
//             </button>
//           </div>

//           <div className="roles-table-wrap">
//             <table className="roles-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Role Name</th>
//                   <th>Description</th>
//                   <th>Permissions</th>
//                   <th>Created By</th>
//                   <th>Updated By</th>
//                   <th>Status</th>
//                   <th>Created At</th>
//                   <th>Updated At</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredRoles.length > 0 ? (
//                   filteredRoles.map((role) => (
//                     <tr key={role.id}>
//                       <td>{role.id}</td>
//                       <td>{role.roleName}</td>
//                       <td>{role.description}</td>
//                       <td>{role.permissions.join(", ")}</td>
//                       <td>{role.createdBy}</td>
//                       <td>{role.updatedBy}</td>
//                       <td>
//                         <span
//                           className={
//                             role.status === "Active"
//                               ? "role-status active"
//                               : "role-status inactive"
//                           }
//                         >
//                           {role.status}
//                         </span>
//                       </td>
//                       <td>{role.createdAt}</td>
//                       <td>{role.updatedAt}</td>
//                       <td>
//                         <div className="roles-actions">
//                           <Pencil size={19} className="edit-icon" />
//                           <Trash2
//                             size={19}
//                             className="delete-icon"
//                             onClick={() => handleDelete(role.id)}
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="10" className="no-data">
//                       No roles added yet
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {showModal && (
//           <div className="role-modal-overlay">
//             <div className="role-modal">
//               <div className="role-modal-header">
//                 <h2>Add New Role</h2>
//                 <button
//                   className="close-btn"
//                   onClick={() => setShowModal(false)}
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <form className="role-form" onSubmit={handleAddRole}>
//                 <div className="role-form-grid">
//                   <div>
//                     <label>Role Name</label>
//                     <input
//                       type="text"
//                       name="roleName"
//                       value={formData.roleName}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label>Status</label>
//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleChange}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                     </select>
//                   </div>

//                   <div className="full-width">
//                     <label>Description</label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows="4"
//                     ></textarea>
//                   </div>

//                   <div className="full-width">
//                     <label>Permissions</label>
//                     <div className="permissions-box">
//                       {permissionOptions.map((permission) => (
//                         <label key={permission} className="permission-item">
//                           <input
//                             type="checkbox"
//                             checked={formData.permissions.includes(permission)}
//                             onChange={() => handlePermissionChange(permission)}
//                           />
//                           <span>{permission}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="role-form-actions">
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="save-btn">
//                     Save Role
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Roles;



import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import "../css/Roles.css";

import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../api/roleApi";

function Role() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    status: "ACTIVE",
    createdBy: "",
    updatedBy: "",
    permissionIds: "",
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await getAllRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      alert("Failed to fetch roles");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      roleName: "",
      description: "",
      status: "ACTIVE",
      createdBy: "",
      updatedBy: "",
      permissionIds: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roleName || !formData.description || !formData.status || !formData.createdBy) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      roleName: formData.roleName,
      description: formData.description,
      status: formData.status,
      createdBy: formData.createdBy,
      updatedBy: formData.updatedBy,
      permissionIds: formData.permissionIds
        ? formData.permissionIds
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id !== "")
            .map((id) => Number(id))
        : [],
    };

    try {
      if (editId) {
        await updateRole(editId, payload);
        alert("Role updated successfully");
      } else {
        await createRole(payload);
        alert("Role created successfully");
      }

      await fetchRoles();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving role:", error);
      alert("Failed to save role");
    }
  };

  const handleEdit = async (id) => {
    try {
      const role = await getRoleById(id);

      setFormData({
        roleName: role.roleName || "",
        description: role.description || "",
        status: role.status || "ACTIVE",
        createdBy: "",
        updatedBy: "",
        permissionIds: "",
      });

      setEditId(role.roleId);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching role by id:", error);
      alert("Failed to fetch role details");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      alert("Role deleted successfully");
      fetchRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
      alert("Failed to delete role");
    }
  };

  const filteredRoles = roles.filter((role) =>
    `${role.roleId} ${role.roleName} ${role.description} ${role.status} ${(role.permissions || []).join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="role-layout">
      <Sidebar />

      <div className="role-main">
        <Topbar title="Roles" />

        <div className="role-content">
          <div className="role-toolbar">
            <div className="role-search">
              <Search size={22} />
              <input
                type="text"
                placeholder="Search roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="role-add-btn"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              <Plus size={20} />
              Add Role
            </button>
          </div>

          <div className="role-table-wrap">
            <table className="role-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Role Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Permissions</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <tr key={role.roleId}>
                      <td>{role.roleId}</td>
                      <td>{role.roleName}</td>
                      <td>{role.description}</td>
                      <td>
                        <span className={`role-status ${String(role.status).toLowerCase()}`}>
                          {role.status}
                        </span>
                      </td>
                      <td>
                        {(role.permissions || []).length > 0
                          ? role.permissions.join(", ")
                          : "No Permissions"}
                      </td>
                      <td>
                        <div className="role-actions">
                          <Pencil
                            size={19}
                            className="edit-icon"
                            onClick={() => handleEdit(role.roleId)}
                          />
                          <Trash2
                            size={19}
                            className="delete-icon"
                            onClick={() => handleDelete(role.roleId)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No roles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="role-modal-overlay">
            <div className="role-modal">
              <div className="role-modal-header">
                <h2>{editId ? "Edit Role" : "Add Role"}</h2>

                <button
                  className="close-btn"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <form className="role-form" onSubmit={handleSubmit}>
                <div className="role-form-grid">
                  <div>
                    <label>Role Name</label>
                    <input
                      type="text"
                      name="roleName"
                      value={formData.roleName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </div>

                  <div>
                    <label>Created By</label>
                    <input
                      type="text"
                      name="createdBy"
                      value={formData.createdBy}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Updated By</label>
                    <input
                      type="text"
                      name="updatedBy"
                      value={formData.updatedBy}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Permission IDs</label>
                    <input
                      type="text"
                      name="permissionIds"
                      placeholder="Example: 1,2,3"
                      value={formData.permissionIds}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="role-form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-btn">
                    {editId ? "Update Role" : "Save Role"}
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

export default Role;
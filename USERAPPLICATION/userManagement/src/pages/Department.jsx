// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
// import "../css/Department.css";

// function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     organization: "",
//     head: "",
//     members: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleAddDepartment = (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.organization || !formData.head || !formData.members) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newDepartment = {
//       id: departments.length + 1,
//       ...formData,
//       createdDate: new Date().toLocaleDateString(),
//     };

//     setDepartments((prev) => [...prev, newDepartment]);

//     setFormData({
//       name: "",
//       organization: "",
//       head: "",
//       members: "",
//     });

//     setShowModal(false);
//   };

//   const handleDelete = (id) => {
//     setDepartments((prev) => prev.filter((item) => item.id !== id));
//   };

//   const filteredDepartments = departments.filter((item) =>
//     `${item.name} ${item.organization} ${item.head}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div className="department-layout">
//       <Sidebar />

//       <div className="department-main">
//         <Topbar title="Departments" />

//         <div className="department-content">

//           <div className="department-toolbar">

//             <div className="department-search">
//               <Search size={22} />
//               <input
//                 type="text"
//                 placeholder="Search departments..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>

//             <button
//               className="department-add-btn"
//               onClick={() => setShowModal(true)}
//             >
//               <Plus size={20} />
//               Add Department
//             </button>

//           </div>

//           <div className="department-table-wrap">
//             <table className="department-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Department Name</th>
//                   <th>Organization</th>
//                   <th>Department Head</th>
//                   <th>Members</th>
//                   <th>Created Date</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {filteredDepartments.length > 0 ? (
//                   filteredDepartments.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.id}</td>
//                       <td>{item.name}</td>
//                       <td>{item.organization}</td>
//                       <td>{item.head}</td>
//                       <td>{item.members}</td>
//                       <td>{item.createdDate}</td>

//                       <td>
//                         <div className="department-actions">
//                           <Pencil size={19} className="edit-icon" />
//                           <Trash2
//                             size={19}
//                             className="delete-icon"
//                             onClick={() => handleDelete(item.id)}
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="no-data">
//                       No departments added yet
//                     </td>
//                   </tr>
//                 )}

//               </tbody>
//             </table>
//           </div>

//         </div>

//         {showModal && (
//           <div className="department-modal-overlay">

//             <div className="department-modal">

//               <div className="department-modal-header">
//                 <h2>Add Department</h2>

//                 <button
//                   className="close-btn"
//                   onClick={() => setShowModal(false)}
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <form className="department-form" onSubmit={handleAddDepartment}>

//                 <div className="department-form-grid">

//                   <div>
//                     <label>Department Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label>Organization</label>
//                     <input
//                       type="text"
//                       name="organization"
//                       value={formData.organization}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label>Department Head</label>
//                     <input
//                       type="text"
//                       name="head"
//                       value={formData.head}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label>Members</label>
//                     <input
//                       type="number"
//                       name="members"
//                       value={formData.members}
//                       onChange={handleChange}
//                     />
//                   </div>

//                 </div>

//                 <div className="department-form-actions">

//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>

//                   <button type="submit" className="save-btn">
//                     Save Department
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

// export default Department;



import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import "../css/Department.css";

import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../api/departmentApi";

function Department() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    departmentName: "",
    numberOfTrainingsGoingOn: "",
    description: "",
    organizationId: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      alert("Failed to fetch departments");
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
      departmentName: "",
      numberOfTrainingsGoingOn: "",
      description: "",
      organizationId: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.departmentName ||
      !formData.numberOfTrainingsGoingOn ||
      !formData.description ||
      !formData.organizationId
    ) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      ...formData,
      numberOfTrainingsGoingOn: Number(formData.numberOfTrainingsGoingOn),
      organizationId: Number(formData.organizationId),
    };

    try {
      if (editId) {
        await updateDepartment(editId, payload);
        alert("Department updated successfully");
      } else {
        await createDepartment(payload);
        alert("Department created successfully");
      }

      await fetchDepartments();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving department:", error);
      alert("Failed to save department");
    }
  };

  const handleEdit = async (id) => {
    try {
      const dept = await getDepartmentById(id);

      setFormData({
        departmentName: dept.departmentName,
        numberOfTrainingsGoingOn: dept.numberOfTrainingsGoingOn,
        description: dept.description,
        organizationId: dept.organizationId,
      });

      setEditId(dept.id);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching department by id:", error);
      alert("Failed to fetch department details");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      alert("Department deleted successfully");
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Failed to delete department");
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    `${dept.id} ${dept.departmentName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="department-layout">
      <Sidebar />

      <div className="department-main">
        <Topbar title="Departments" />

        <div className="department-content">
          <div className="department-toolbar">
            <div className="department-search">
              <Search size={22} />
              <input
                type="text"
                placeholder="Search departments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="department-add-btn"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              <Plus size={20} />
              Add Department
            </button>
          </div>

          <div className="department-table-wrap">
            <table className="department-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Department Name</th>
                  <th>No. of Trainings</th>
                  <th>Description</th>
                  <th>Organization ID</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((dept) => (
                    <tr key={dept.id}>
                      <td>{dept.id}</td>
                      <td>{dept.departmentName}</td>
                      <td>{dept.numberOfTrainingsGoingOn}</td>
                      <td>{dept.description}</td>
                      <td>{dept.organizationId}</td>
                      <td>
                        <div className="department-actions">
                          <Pencil
                            size={19}
                            className="edit-icon"
                            onClick={() => handleEdit(dept.id)}
                          />
                          <Trash2
                            size={19}
                            className="delete-icon"
                            onClick={() => handleDelete(dept.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No departments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="dept-modal-overlay">
            <div className="dept-modal">
              <div className="dept-modal-header">
                <h2>{editId ? "Edit Department" : "Add Department"}</h2>

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

              <form className="dept-form" onSubmit={handleSubmit}>
                <div className="dept-form-grid">
                  <div>
                    <label>Department Name</label>
                    <select
                      name="departmentName"
                      value={formData.departmentName}
                      onChange={handleChange}
                    >
                      <option value="">Select Department</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="FINANCE">FINANCE</option>
                      <option value="SALES">SALES</option>
                      <option value="MARKETING">MARKETING</option>
                    </select>
                  </div>

                  <div>
                    <label>Number Of Trainings Going On</label>
                    <input
                      type="number"
                      name="numberOfTrainingsGoingOn"
                      value={formData.numberOfTrainingsGoingOn}
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
                    <label>Organization ID</label>
                    <input
                      type="number"
                      name="organizationId"
                      value={formData.organizationId}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="dept-form-actions">
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
                    {editId ? "Update Department" : "Save Department"}
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

export default Department;
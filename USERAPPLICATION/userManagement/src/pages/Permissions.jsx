import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import "../css/Permissions.css";

import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission
} from "../api/permissionApi";

function Permissions() {

  const [permissions, setPermissions] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  /* FETCH PERMISSIONS */
const fetchPermissions = async () => {

  try {

    const res = await getPermissions(0,10);

    console.log("API Response:", res.data);

    setPermissions(res.data.data);

  } catch (error) {

    console.error(error);

  }

};

  useEffect(() => {

    fetchPermissions();

  }, []);

  /* FORM CHANGE */

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  /* ADD / UPDATE PERMISSION */

  const handleAddPermission = async (e) => {

    e.preventDefault();

    if (!formData.name || !formData.description) {

      alert("Please fill all fields");

      return;

    }

    try {

      if (editId) {

        await updatePermission(editId, formData);

      } else {

        await createPermission(formData);

      }

      fetchPermissions();

      setFormData({
        name: "",
        description: "",
      });

      setEditId(null);

      setShowModal(false);

    } catch (error) {

      console.error(error);

    }

  };

  /* DELETE PERMISSION */

  const handleDelete = async (id) => {

    try {

      await deletePermission(id);

      fetchPermissions();

    } catch (error) {

      console.error(error);

    }

  };

  /* EDIT PERMISSION */

  const handleEdit = (permission) => {

    setFormData({
      name: permission.name,
      description: permission.description,
    });

    setEditId(permission.id);

    setShowModal(true);

  };

  /* SEARCH */
  const filteredPermissions = permissions.filter((item) =>
    `${item.id} ${item.name} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="permissions-layout">

      <Sidebar />

      <div className="permissions-main">

        <Topbar title="Permissions" />

        <div className="permissions-content">

          <div className="permissions-toolbar">

            <div className="permissions-search">

              <Search size={22} />

              <input
                type="text"
                placeholder="Search permissions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <button
              className="permissions-add-btn"
              onClick={() => {
                setEditId(null);
                setFormData({ name: "", description: "" });
                setShowModal(true);
              }}
            >

              <Plus size={20} />
              Add Permission

            </button>

          </div>

          <div className="permissions-table-wrap">

            <table className="permissions-table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Permission Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredPermissions.length > 0 ? (

                  filteredPermissions.map((item) => (

                    <tr key={item.id}>

                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>

                      <td>

                        <div className="permissions-actions">

                          <Pencil
                            size={18}
                            className="edit-icon"
                            onClick={() => handleEdit(item)}
                          />

                          <Trash2
                            size={18}
                            className="delete-icon"
                            onClick={() => handleDelete(item.id)}
                          />

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="4" className="no-data">
                      No permissions found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {showModal && (

          <div className="permission-modal-overlay">

            <div className="permission-modal">

              <div className="permission-modal-header">

                <h2>
                  {editId ? "Update Permission" : "Add Permission"}
                </h2>

                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  <X size={24} />
                </button>

              </div>

              <form
                className="permission-form"
                onSubmit={handleAddPermission}
              >

                <div className="permission-form-grid">

                  <div>

                    <label>Permission Name</label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="full-width">

                    <label>Description</label>

                    <textarea
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <div className="permission-form-actions">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-btn"
                  >
                    {editId ? "Update Permission" : "Save Permission"}
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

export default Permissions;
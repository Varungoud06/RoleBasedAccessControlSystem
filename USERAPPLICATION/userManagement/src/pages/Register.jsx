import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    alert("User Registered Successfully");

    navigate("/verify");
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (

    <div className="register-container">

      <div className="register-card">

        <h2>Register</h2>
        <p>Create your account to get started.</p>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="field">
              <label>First Name *</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            
            <div className="field">
              <label>Last Name *</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="field">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Mobile Number *</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Address *</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="buttons">

            <button
              type="button"
              className="cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="save">
              Save 
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Register;
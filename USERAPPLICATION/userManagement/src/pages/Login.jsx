import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p>Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit}>
          <label>Username or Email</label>
          <input type="text" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">Login</button>
        </form>

        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span>or</span>
          <Link to="/register">Register New User</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
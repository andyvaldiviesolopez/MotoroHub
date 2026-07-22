import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css"

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const data = await loginUser(formData);

      login(data.user, data.token);

      navigate("/garage");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card fade-up">

        <h2 className="login-title">
          Motoro<span>Hub</span>
        </h2>

        <p className="login-subtitle">
          Accedi al tuo garage.
        </p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button className="btn btn-danger w-100 login-button">
            Accedi
          </button>

        </form>
        <p className="login-register-link">
          Non hai un account?{" "}
          <Link to="/register">
            Registrati
          </Link>
        </p>
      </div>

    </div>
  );

}

export default Login;
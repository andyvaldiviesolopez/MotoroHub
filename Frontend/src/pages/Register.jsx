import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import Spinner from "react-bootstrap/Spinner";
import "../styles/register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    city: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleAvatarChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (avatar) {
        data.append("avatar", avatar);
      }

      await registerUser(data);

      setSuccess("Registrazione completata! Reindirizzamento al login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-page">
      <div className="register-card fade-up">

        <h2 className="register-title">
          Motoro<span>Hub</span>
        </h2>

        <p className="register-subtitle">
          Crea il tuo account.
        </p>

        <div className="avatar-preview">

          {preview ? (

            <img
              src={preview}
              alt="Avatar"
              className="preview-avatar"
            />

          ) : (

            <div className="default-avatar">
              <i className="bi bi-person-fill"></i>
            </div>

          )}

        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Nome
              </label>

              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Cognome
              </label>

              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Città
              </label>

              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
              />

            </div>

            <div className="col-12 mb-3">

              <label className="form-label">
                Foto profilo
              </label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={loading}
              />

            </div>
          </div>

          <div className="d-grid mt-4">

            <button
              type="submit"
              className="btn btn-danger w-100 register-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Registrazione...
                </>
              ) : (
                "Registrati"
              )}
            </button>

          </div>

        </form>
        <p className="register-login-link">
          Hai già un account?{" "}
          <Link to="/login">
            Accedi
          </Link>
        </p>
      </div>
    </div>

  );

}

export default Register;
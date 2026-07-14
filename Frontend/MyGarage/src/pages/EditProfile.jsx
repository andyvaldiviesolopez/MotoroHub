import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserById, updateUser } from "../services/api";

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateLoggedUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    city: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUserById(user.id);

        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          email: data.email || "",
          city: data.city || "",
        });

      } catch (err) {
        setError(err.message);
      }
    }

    loadUser();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {

      const updatedUser = await updateUser(
        user.id,
        formData
      );

      updateLoggedUser(updatedUser);
      navigate("/profile");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "700px" }}
    >

      <h1 className="mb-4 text-center">
        Modifica Profilo
      </h1>

      {error && (
        <div className="alert alert-danger">
          {error}
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
            />

          </div>

        </div>

        <div className="d-flex gap-3 mt-4">

          <button
            type="submit"
            className="btn btn-warning"
          >
            💾 Salva Modifiche
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/profile")}
          >
            Annulla
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditProfile;
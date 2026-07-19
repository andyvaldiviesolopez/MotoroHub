import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getUserById,
  updateUser,
  uploadAvatar,
} from "../services/api";

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateLoggedUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    city: "",
    bio: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [preview, setPreview] = useState("");
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
          bio: data.bio || "",
        });

        setPreview(data.avatar);
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadAvatar = async () => {
    if (!selectedAvatar) return null;

    const updatedUser = await uploadAvatar(selectedAvatar);

    updateLoggedUser(updatedUser);

    return updatedUser;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      let updatedUser = await updateUser(user.id, formData);

      if (selectedAvatar) {
        updatedUser = await handleUploadAvatar();
      }

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
      <div className="card shadow">

        <div className="card-body">

          <div className="text-center mb-4">

            <label
              htmlFor="avatarInput"
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  preview ||
                  "https://placehold.co/150x150?text=User"
                }
                alt="Avatar"
                className="rounded-circle shadow"
                width="150"
                height="150"
                style={{
                  objectFit: "cover",
                  border: "4px solid #f8f9fa",
                }}
              />
            </label>

            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />

            <h2 className="mt-3">
              Modifica Profilo
            </h2>

            <p className="text-muted mb-0">
              Clicca sulla foto per cambiare avatar
            </p>

            {selectedAvatar && (
              <div className="alert alert-info mt-3 mb-0">
                📷 Nuova immagine selezionata.
                Verrà caricata quando salverai il profilo.
              </div>
            )}

          </div>

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
              <div className="col-12 mb-3">

                <label className="form-label">
                  Bio
                </label>

                <textarea
                  className="form-control"
                  name="bio"
                  rows="4"
                  maxLength={300}
                  placeholder="Racconta qualcosa di te..."
                  value={formData.bio}
                  onChange={handleChange}
                />

                <div className="form-text text-end">
                  {formData.bio.length}/300 caratteri
                </div>

              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">

              <button
                type="submit"
                className="btn btn-warning"
              >
                💾 Salva Profilo
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

      </div>

    </div>
  );
}

export default EditProfile;
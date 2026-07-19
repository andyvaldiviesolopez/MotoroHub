import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserById, deleteUser } from "../services/api";
import ConfirmModal from "../components/ConfirmModal";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getUserById(user.id);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user.id]);

  const handleDelete = async () => {
    try {
      setShowModal(false);

      await deleteUser(user.id);

      logout();

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Caricamento...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card shadow">

        <div className="card-body text-center">

          <img
            src={
              profile.avatar ||
              "https://placehold.co/150x150?text=User"
            }
            alt={profile.username}
            className="rounded-circle mb-4"
            width="150"
            height="150"
            style={{ objectFit: "cover" }}
          />

          <h2>
            {profile.firstName} {profile.lastName}
          </h2>

          <p className="text-muted">
            @{profile.username}
          </p>

          <hr />

          <div className="row text-start">

            <div className="col-md-6">

              <p>
                <strong>Email:</strong> {profile.email}
              </p>

              <p>
                <strong>Città:</strong>{" "}
                {profile.city || "-"}
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <strong>Bio:</strong>
              </p>

              <p>
                {profile.bio || "Nessuna bio inserita"}
              </p>

            </div>

          </div>

          <hr />

          <div className="d-flex justify-content-center gap-3">

            <button
              className="btn btn-warning"
              onClick={handleEdit}
            >
              ✏️ Modifica Profilo
            </button>

            <button
              className="btn btn-dark"
              onClick={() => navigate("/profile/password")}
            >
              🔒 Cambia Password
            </button>

            <button
              className="btn btn-danger"
              onClick={() => setShowModal(true)}
            >
              🗑 Elimina Account
            </button>

          </div>

        </div>

      </div>

      <ConfirmModal
        show={showModal}
        title="Elimina Account"
        message="Sei sicuro di voler eliminare definitivamente il tuo account?"
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      />

    </div>
  );
}

export default Profile;
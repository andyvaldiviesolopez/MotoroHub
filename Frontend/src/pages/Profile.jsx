import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getUserById, deleteUser } from "../services/api";

import ConfirmModal from "../components/ConfirmModal";
import SuccessModal from "../components/SuccessModal";
import "../styles/profile.css";

function Profile() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

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

      console.log("utente eliminato")

      setShowDeleteSuccessModal(true);

      console.log("modal aperto")

    } catch (err) {

      console.log(err)
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

    <div className="profile-page">

      <div className="container py-5">

        <div className="profile-card fade-up">

          <div className="profile-header">

            <img
              src={
                profile.avatar ||
                "https://placehold.co/200x200?text=User"
              }
              alt={profile.username}
              className="profile-avatar"
            />

            <h1>

              {profile.firstName} {profile.lastName}

            </h1>

            <p className="profile-username">

              @{profile.username}

            </p>

          </div>

          <div className="profile-info-grid">
            <div className="info-card">

              <h5>

                <i className="bi bi-envelope-fill me-2"></i>

                Email

              </h5>

              <p>

                {profile.email}

              </p>

            </div>

            <div className="info-card">

              <h5>

                <i className="bi bi-geo-alt-fill me-2"></i>

                Città

              </h5>

              <p>

                {profile.city || "Non specificata"}

              </p>

            </div>

            <div className="info-card full-width">

              <h5>

                <i className="bi bi-person-lines-fill me-2"></i>

                Bio

              </h5>

              <p>

                {profile.bio || "Nessuna bio inserita."}

              </p>

            </div>

          </div>

          <div className="profile-actions">

            <button
              className="btn btn-danger"
              onClick={handleEdit}
            >

              <i className="bi bi-pencil-square me-2"></i>

              Modifica Profilo

            </button>

            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/profile/password")}
            >

              <i className="bi bi-lock-fill me-2"></i>

              Cambia Password

            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => setShowModal(true)}
            >

              <i className="bi bi-trash-fill me-2"></i>

              Elimina Account

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

      <SuccessModal
        show={showDeleteSuccessModal}
        title="Account eliminato"
        message="Il tuo garage è stato svuotato e il tuo account è stato eliminato con successo. Grazie per aver fatto parte della community MotoroHub! 🏍️"
        onClose={() => {

          logout();

          navigate("/");

        }}
      />

    </div>

  );

}

export default Profile;
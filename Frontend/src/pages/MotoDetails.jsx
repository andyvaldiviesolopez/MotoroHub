import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMotorcycleById, deleteMotorcycle, contactSeller } from "../services/api";
import ConfirmModal from "../components/ConfirmModal";
import ContactSellerModal from "../components/ContactSellerModal";
import SuccessModal from "../components/SuccessModal";
import "../styles/motoDetails.css";

function MotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [motorcycle, setMotorcycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    async function loadMotorcycle() {
      try {
        const data = await getMotorcycleById(id);
        setMotorcycle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMotorcycle();
  }, [id]);

  const handleEdit = () => {
    navigate(`/garage/edit/${motorcycle._id}`);
  };

  const handleDelete = async () => {
    try {
      setShowModal(false);

      await deleteMotorcycle(id);

      navigate("/garage");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleContactSeller = async (message) => {
    try {
      await contactSeller(id, message);

      setShowContactModal(false);

      setShowSuccessModal(true);
    } catch (err) {
      alert(err.message);
    }
  };
  if (loading) {
    return (
      <div className="container py-5">
        <h3>Caricamento moto...</h3>
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

  const isOwner = motorcycle?.owner?._id === user?.id;

  return (
    <div className="container py-5">

      <div className="details-card fade-up">

        <img
          src={
            motorcycle.image ||
            "https://placehold.co/1200x700?text=MotoroHub"
          }
          alt={`${motorcycle.brand} ${motorcycle.model}`}
          className="details-image"
        />

        <div className="details-body">

          <div className="details-header">

            <div>

              <h1 className="details-title">
                {motorcycle.brand}
              </h1>

              <p className="details-model">
                {motorcycle.model}
              </p>

            </div>

            {motorcycle.isForSale && (

              <span className="details-sale-badge">

                In vendita

              </span>

            )}

          </div>

          <div className="details-owner">

            <span>

              <i className="bi bi-person-circle me-2"></i>

              {motorcycle.owner.firstName}

            </span>

          </div>

          <div className="details-specs">

            <div>

              <span>📅 Anno</span>

              <strong>{motorcycle.year}</strong>

            </div>

            <div>

              <span>⚙️ Cilindrata</span>

              <strong>{motorcycle.cilindrata} cc</strong>

            </div>

            <div>

              <span>🔥 Potenza</span>

              <strong>{motorcycle.power} CV</strong>

            </div>

            <div>

              <span>🛣️ Chilometri</span>

              <strong>{motorcycle.kilometers.toLocaleString()} km</strong>

            </div>

            <div>

              <span>🎨 Colore</span>

              <strong>{motorcycle.color}</strong>

            </div>

            {motorcycle.isForSale && (

              <div>

                <span>💰 Prezzo</span>

                <strong>
                  € {motorcycle.price.toLocaleString()}
                </strong>

              </div>

            )}

          </div>

          <h3 className="section-title">

            Descrizione

          </h3>

          <div className="description-box">

            {motorcycle.description ||
              "Nessuna descrizione disponibile."}

          </div>

          {isOwner ? (

            <div className="details-actions">

              <button
                className="btn btn-outline-danger"
                onClick={handleEdit}
              >
                <i className="bi bi-pencil-square me-2"></i>

                Modifica
              </button>

              <button
                className="btn btn-danger"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-trash me-2"></i>

                Elimina
              </button>

            </div>

          ) : (

            motorcycle.isForSale && (

              <div className="details-actions">

                <button
                  className="btn btn-danger"
                  onClick={() => setShowContactModal(true)}
                >
                  <i className="bi bi-envelope-fill me-2"></i>

                  Contatta il venditore
                </button>

              </div>

            )

          )}

        </div>

      </div>

      <ConfirmModal
        show={showModal}
        title="Elimina Moto"
        message={`Sei sicuro di voler eliminare ${motorcycle.brand} ${motorcycle.model}?`}
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      />

      <ContactSellerModal
        show={showContactModal}
        motorcycle={motorcycle}
        onClose={() => setShowContactModal(false)}
        onSend={handleContactSeller}
      />

      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Messaggio inviato!"
        message="Il venditore riceverà il tuo messaggio e potrà contattarti tramite email."
      />

    </div>
  );
}

export default MotoDetails;
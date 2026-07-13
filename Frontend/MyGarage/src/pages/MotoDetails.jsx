import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMotorcycleById,
  deleteMotorcycle,
} from "../services/api";
import ConfirmModal from "../components/ConfirmModal";

function MotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [motorcycle, setMotorcycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Caricamento...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow">

        <img
          src={
            motorcycle.image ||
            "https://placehold.co/900x500?text=MyGarage"
          }
          className="card-img-top"
          alt={`${motorcycle.brand} ${motorcycle.model}`}
          style={{
            maxHeight: "450px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center">

            <h2>
              {motorcycle.brand} {motorcycle.model}
            </h2>

            {motorcycle.isForSale && (
              <span className="badge bg-danger fs-6">
                In vendita
              </span>
            )}

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

              <p><strong>Anno:</strong> {motorcycle.year}</p>

              <p><strong>Cilindrata:</strong> {motorcycle.cilindrata} cc</p>

              <p><strong>Potenza:</strong> {motorcycle.power} CV</p>

              <p><strong>Chilometri:</strong> {motorcycle.kilometers.toLocaleString()} km</p>

            </div>

            <div className="col-md-6">

              <p><strong>Colore:</strong> {motorcycle.color}</p>

              <p><strong>Proprietario:</strong> {motorcycle.owner.firstName}</p>

              {motorcycle.isForSale && (
                <p><strong>Prezzo:</strong> € {motorcycle.price}</p>
              )}

            </div>

          </div>

          <hr />

          <h5>Descrizione</h5>

          <p>
            {motorcycle.description || "Nessuna descrizione."}
          </p>

          <hr />

          <div className="d-flex gap-3">

            <button
              className="btn btn-warning"
              onClick={handleEdit}
            >
              ✏️ Modifica Moto
            </button>

            <button
              className="btn btn-danger"
              onClick={() => setShowModal(true)}
            >
              🗑 Elimina Moto
            </button>

          </div>

        </div>

      </div>

      <ConfirmModal
        show={showModal}
        title="Elimina Moto"
        message={`Sei sicuro di voler eliminare ${motorcycle.brand} ${motorcycle.model}?`}
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      />

    </div>
  );
}

export default MotoDetails;
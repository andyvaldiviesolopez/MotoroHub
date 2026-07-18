import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function CommunityCard({ motorcycle }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">

        <img
          src={
            motorcycle.image ||
            "https://placehold.co/600x400?text=MyGarage"
          }
          className="card-img-top"
          alt={`${motorcycle.brand} ${motorcycle.model}`}
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />

        <div className="card-body d-flex flex-column">

          <div className="d-flex justify-content-between align-items-start mb-3">

            <div>
              <h5 className="card-title mb-1">
                {motorcycle.brand} {motorcycle.model}
              </h5>

              <span
                className={`badge ${motorcycle.isForSale
                  ? "bg-danger"
                  : "bg-secondary"
                  }`}
              >
                {motorcycle.isForSale
                  ? "🏷️ In vendita"
                  : "Non in vendita"}
              </span>
            </div>

            <button
              className={`btn btn-sm ${isFavorite(motorcycle._id)
                  ? "btn-outline-danger"
                  : "btn-outline-secondary"
                }`}
              onClick={() => toggleFavorite(motorcycle._id)}
            >
              {isFavorite(motorcycle._id)
                ? "❤️ Rimuovi dai preferiti"
                : "🤍 Aggiungi ai preferiti"}
            </button>

          </div>

          <div className="row text-center mb-3">

            <div className="col-6 mb-2">
              <small className="text-muted d-block">📅 Anno</small>
              <strong>{motorcycle.year}</strong>
            </div>

            <div className="col-6 mb-2">
              <small className="text-muted d-block">⚙️ Cilindrata</small>
              <strong>{motorcycle.cilindrata} cc</strong>
            </div>

            <div className="col-6">
              <small className="text-muted d-block">🛣️ Km</small>
              <strong>{motorcycle.kilometers.toLocaleString()} km</strong>
            </div>

            <div className="col-6">
              <small className="text-muted d-block">🎨 Colore</small>
              <strong>{motorcycle.color}</strong>
            </div>

          </div>

          <hr />

          <p className="mb-1">
            <strong>👤 Proprietario:</strong> {motorcycle.owner.firstName}
          </p>

          <p className="mb-3">
            <strong>📍 Città:</strong> {motorcycle.owner.city || "-"}
          </p>

          {motorcycle.isForSale && (
            <div className="alert alert-success py-2 text-center fw-bold">
              💰 € {motorcycle.price.toLocaleString()}
            </div>
          )}

          <div className="mt-auto">

            <Link
              to={`/garage/${motorcycle._id}`}
              className="btn btn-dark w-100"
            >
              👁 Dettagli
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CommunityCard;
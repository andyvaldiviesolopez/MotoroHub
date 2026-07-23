import { Link } from "react-router-dom";
import "../styles/motoCard.css";

function MotoCard({ motorcycle }) {
  return (
    <div className="motorcycle-card">

      <div className="motorcycle-image-wrapper">

        <img
          src={
            motorcycle.image ||
            "https://placehold.co/600x400?text=MotoroHub"
          }
          className="motorcycle-image"
          alt={`${motorcycle.brand} ${motorcycle.model}`}
        />

        <span
          className={
            motorcycle.isForSale
              ? "sale-badge sale"
              : "sale-badge"
          }
        >
          {motorcycle.isForSale ? "In vendita" : "Nel garage"}
        </span>

      </div>

      <div className="motorcycle-body">

        <h3 className="motorcycle-brand">
          {motorcycle.brand}
        </h3>

        <p className="motorcycle-model">
          {motorcycle.model}
        </p>

        <div className="owner-badge">
          <i className="bi bi-person-circle"></i>
          @{motorcycle.owner?.username}
        </div>

        <div className="motorcycle-specs">

          <div>
            <span>📅</span>
            <strong>{motorcycle.year}</strong>
          </div>

          <div>
            <span>⚙️</span>
            <strong>{motorcycle.cilindrata} cc</strong>
          </div>

          <div>
            <span>🐎</span>
            <strong>{motorcycle.power} CV</strong>
          </div>

          <div>
            <span>🛣️</span>
            <strong>{motorcycle.kilometers.toLocaleString()} km</strong>
          </div>

        </div>

        <Link
          to={`/garage/${motorcycle._id}`}
          className="btn btn-danger w-100 motorcycle-button"
        >
          Dettagli
        </Link>

      </div>

    </div>
  );
}

export default MotoCard;
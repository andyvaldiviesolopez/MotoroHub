import { Link } from "react-router-dom";

function MotoCard({ motorcycle }) {
  return (
    <div className="card shadow h-100 motorcycle-card">

      <img
        src={
          motorcycle.image ||
          "https://placehold.co/600x400?text=MyGarage"
        }
        className="card-img-top motorcycle-image"
        alt={`${motorcycle.brand} ${motorcycle.model}`}
      />

      <div className="card-body d-flex flex-column">

        <div className="d-flex justify-content-between align-items-center">

          <h4 className="mb-0">
            {motorcycle.brand}
          </h4>

        </div>

        <h6 className="text-secondary mb-3">
          {motorcycle.model}
        </h6>

        <p className="mb-1">
          📅 {motorcycle.year}
        </p>

        <p className="mb-1">
          ⚙️ {motorcycle.cilindrata} cc
        </p>

        <p className="mb-1">
          🐎 {motorcycle.power} CV
        </p>

        <p className="mb-3">
          🛣️ {motorcycle.kilometers.toLocaleString()} km
        </p>

        <div className="mt-auto d-grid">

          <Link
            to={`/garage/${motorcycle._id}`}
            className="btn btn-dark"
          >
            Dettagli
          </Link>

        </div>

      </div>

    </div>
  );
}

export default MotoCard;
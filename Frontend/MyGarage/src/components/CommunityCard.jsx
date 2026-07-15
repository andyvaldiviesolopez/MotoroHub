import { Link } from "react-router-dom";

function CommunityCard({ motorcycle }) {
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

          <div className="d-flex justify-content-between align-items-center">

            <h5 className="card-title mb-0">
              {motorcycle.brand} {motorcycle.model}
            </h5>

            <span
              className={`badge ${
                motorcycle.isForSale
                  ? "bg-danger"
                  : "bg-success"
              }`}
            >
              {motorcycle.isForSale
                ? "In vendita"
                : "Non in vendita"}
            </span>

          </div>

          <hr />

          <p>
            <strong>👤 Proprietario:</strong>{" "}
            {motorcycle.owner.firstName}
          </p>

          <p>
            <strong>📍 Città:</strong>{" "}
            {motorcycle.owner.city || "-"}
          </p>

          <p>
            <strong>📅 Anno:</strong>{" "}
            {motorcycle.year}
          </p>

          <p>
            <strong>⚙️ Cilindrata:</strong>{" "}
            {motorcycle.cilindrata} cc
          </p>

          {motorcycle.isForSale && (
            <p>
              <strong>💰 Prezzo:</strong>{" "}
              € {motorcycle.price}
            </p>
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
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/communityCard.css";

function CommunityCard({ motorcycle }) {

  const { isFavorite, toggleFavorite } = useFavorites();

  return (

    <div className="col-lg-4 col-md-6 mb-4">

      <div className="community-card">

        <div className="community-image-wrapper">

          <img
            src={
              motorcycle.image ||
              "https://placehold.co/600x400?text=MotoroHub"
            }
            className="community-image"
            alt={`${motorcycle.brand} ${motorcycle.model}`}
          />

          <span
            className={
              motorcycle.isForSale
                ? "community-sale-badge sale"
                : "community-sale-badge"
            }
          >
            {motorcycle.isForSale
              ? "In vendita"
              : "Nel garage"}
          </span>

          <button
            className={
              isFavorite(motorcycle._id)
                ? "favorite-button active"
                : "favorite-button"
            }
            onClick={() => toggleFavorite(motorcycle._id)}
          >
            <i
              className={
                isFavorite(motorcycle._id)
                  ? "bi bi-heart-fill"
                  : "bi bi-heart"
              }
            ></i>
          </button>

        </div>

        <div className="community-body">

          <h3 className="community-brand">
            {motorcycle.brand}
          </h3>

          <p className="community-model">
            {motorcycle.model}
          </p>

          <div className="owner-badge">

            <i className="bi bi-person-circle"></i>

            @{motorcycle.owner.username}

          </div>

          <div className="community-specs">

            <div>
              📅 <strong>{motorcycle.year}</strong>
            </div>

            <div>
              ⚙️ <strong>{motorcycle.cilindrata} cc</strong>
            </div>

            <div>
              🛣️ <strong>{motorcycle.kilometers.toLocaleString()} km</strong>
            </div>

            <div>
              🎨 <strong>{motorcycle.color}</strong>
            </div>

          </div>

          <p className="community-city">
            📍 {motorcycle.owner.city || "Città non disponibile"}
          </p>

          {motorcycle.isForSale && (

            <div className="price-box">

              € {motorcycle.price.toLocaleString()}

            </div>

          )}

          <Link
            to={`/garage/${motorcycle._id}`}
            className="btn btn-danger w-100 community-button"
          >
            Dettagli
          </Link>

        </div>

      </div>

    </div>

  );

}

export default CommunityCard;
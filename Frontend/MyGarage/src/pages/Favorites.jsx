import CommunityCard from "../components/CommunityCard";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container py-4">

      <h1 className="mb-4">❤️ I miei preferiti</h1>

      {favorites.length === 0 ? (
        <div className="alert alert-info text-center">
          Non hai ancora aggiunto moto ai preferiti.
        </div>
      ) : (
        <div className="row">
          {favorites.map((motorcycle) => (
            <CommunityCard
              key={motorcycle._id}
              motorcycle={motorcycle}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Favorites;
import { Link } from "react-router-dom";
import CommunityCard from "../components/CommunityCard";
import { useFavorites } from "../context/FavoritesContext";

import "../styles/favorites.css";

function Favorites() {

    const { favorites } = useFavorites();

    return (

        <div className="favorites-page">

            <div className="container py-5">

                <div className="favorites-header fade-up">

                    <h1>

                        I tuoi <span>Preferiti</span>

                    </h1>

                    <p>

                        Le moto che hai salvato dalla community MotoroHub.

                    </p>

                    <div className="favorites-counter">

                        ❤️ {favorites.length} {favorites.length === 1 ? "moto salvata" : "moto salvate"}

                    </div>

                </div>

                {favorites.length === 0 ? (

                    <div className="favorites-empty fade-up">

                        <i className="bi bi-heart"></i>

                        <h3>

                            Nessun preferito

                        </h3>

                        <p>

                            Esplora la community e salva le moto che ti piacciono.

                        </p>

                        <Link
                            to="/community"
                            className="btn btn-danger"
                        >

                            Vai alla Community

                        </Link>

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

        </div>

    );

}

export default Favorites;
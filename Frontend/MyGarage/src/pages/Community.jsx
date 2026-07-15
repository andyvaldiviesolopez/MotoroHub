import { useEffect, useState } from "react";
import { getMotorcycles } from "../services/api";
import { useAuth } from "../context/AuthContext";
import CommunityCard from "../components/CommunityCard";

function Community() {
  const { user } = useAuth();

  const [motorcycles, setMotorcycles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMotorcycles() {
      try {
        const data = await getMotorcycles();

        const otherMotorcycles = data.motorcycles.filter(
          (motorcycle) => motorcycle.owner._id !== user.id
        );

        setMotorcycles(otherMotorcycles);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadMotorcycles();
    }

  }, [user]);

  const filteredMotorcycles = motorcycles.filter((motorcycle) => {

    const searchText = search.toLowerCase();

    return (
      motorcycle.brand.toLowerCase().includes(searchText) ||
      motorcycle.model.toLowerCase().includes(searchText)
    );

  });

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

  return (
    <div className="container py-5">

      <div className="text-center mb-4">

        <h1>🏍 Community</h1>

        <p className="text-muted">
          Esplora tutte le moto della community MyGarage
        </p>

      </div>

      <div className="row justify-content-center mb-5">

        <div className="col-md-6">

          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="🔍 Cerca marca o modello..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {motorcycles.length === 0 ? (

        <div className="alert alert-info text-center">

          <h4>🏍 Community vuota</h4>

          <p>
            Al momento nessun altro utente ha ancora pubblicato una moto.
          </p>

        </div>

      ) : filteredMotorcycles.length === 0 ? (

        <div className="alert alert-warning text-center">

          <h4>🔍 Nessuna moto trovata</h4>

          <p>
            Prova a cercare un'altra marca o modello.
          </p>

        </div>

      ) : (

        <div className="row">

          {filteredMotorcycles.map((motorcycle) => (

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

export default Community;
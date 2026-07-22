import { useEffect, useState } from "react";
import { getMotorcycles } from "../services/api";
import { useAuth } from "../context/AuthContext";
import CommunityCard from "../components/CommunityCard";
import brands from "../data/brands";
import "../styles/community.css"

function Community() {
  const { user } = useAuth();

  const [motorcycles, setMotorcycles] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [onlyForSale, setOnlyForSale] = useState(false);

  const hasFilters = search !== "" || selectedBrand !== "" || onlyForSale;

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
    const matchesForSale = !onlyForSale || motorcycle.isForSale;
    const searchText = search.toLowerCase();

    const matchesSearch =
      motorcycle.brand.toLowerCase().includes(searchText) ||
      motorcycle.model.toLowerCase().includes(searchText);

    const matchesBrand =
      selectedBrand === "" ||
      motorcycle.brand === selectedBrand;

    return (matchesSearch && matchesBrand && matchesForSale);

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

      <div className="community-header">

        <div>

          <h1 className="community-title">
            Community
          </h1>

          <p className="community-subtitle">
            Esplora le moto condivise dagli altri appassionati.
          </p>

          <p className="community-counter">
            {filteredMotorcycles.length} di {motorcycles.length} moto visualizzate
          </p>

        </div>

      </div>

      <div className="community-filters">

        <div className="community-filters-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="filters-title">
              Filtri
            </h5>

            {hasFilters && (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  setSearch("");
                  setSelectedBrand("");
                  setOnlyForSale(false);
                }}
              >
                Reset
              </button>
            )}

          </div>

          <div className="row g-3 align-items-center">

            {/* Ricerca */}
            <div className="col-lg-6">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Cerca marca o modello..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* Marche */}
            <div className="col-lg-3">

              <select
                className="form-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >

                <option value="">
                  Tutte le marche
                </option>

                {brands.map((brand) => (

                  <option
                    key={brand}
                    value={brand}
                  >
                    {brand}
                  </option>

                ))}

              </select>

            </div>

            {/* Solo in vendita */}
            <div className="col-lg-3">

              <div className="form-check form-switch d-flex align-items-center h-100">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onlyForSale"
                  checked={onlyForSale}
                  onChange={(e) => setOnlyForSale(e.target.checked)}
                />

                <label
                  className="form-check-label ms-2"
                  htmlFor="onlyForSale"
                >
                  Solo in vendita
                </label>

              </div>

            </div>

          </div>

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
import { useEffect, useState } from "react";
import { getMyMotorcycles } from "../services/api";
import MotoCard from "../components/MotoCard";
import { Link } from "react-router-dom"

function Garage() {
    const [motorcycles, setMotorcycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMotorcycles() {
            try {
                const data = await getMyMotorcycles();
                setMotorcycles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadMotorcycles();
    }, []);

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
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Il mio Garage</h1>

                <Link
                    to="/garage/add"
                    className="btn btn-dark"
                >
                    + Aggiungi Moto
                </Link>

            </div>

            {motorcycles.length === 0 ? (
                <div className="alert alert-info">
                    Non hai ancora aggiunto nessuna moto.
                </div>
            ) : (
                <div className="row g-4">

                    {motorcycles.map((motorcycle) => (
                        <div className="col-md-4" key={motorcycle._id}>
                            <MotoCard motorcycle={motorcycle} />
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default Garage;
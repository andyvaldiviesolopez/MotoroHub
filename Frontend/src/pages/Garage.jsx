import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyMotorcycles } from "../services/api";
import MotoCard from "../components/MotoCard";
import "../styles/garage.css";

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
            <div className="container py-5">
                <h3 className="text-center">Caricamento...</h3>
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

            <div className="garage-header">

                <div>

                    <h1 className="garage-title">
                        Il mio Garage
                    </h1>

                    <p className="garage-subtitle">
                        Gestisci le tue moto e tieni aggiornata la tua collezione.
                    </p>

                    <p className="garage-counter">
                        {motorcycles.length}{" "}
                        {motorcycles.length === 1
                            ? "moto registrata"
                            : "moto registrate"}
                    </p>

                </div>

                <Link
                    to="/garage/add"
                    className="btn btn-danger garage-add-btn"
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Aggiungi Moto
                </Link>

            </div>

            {motorcycles.length === 0 ? (

                <div className="empty-garage">

                    <h3>Nessuna moto presente</h3>

                    <p>
                        Inizia aggiungendo la tua prima moto al garage.
                    </p>

                    <Link
                        to="/garage/add"
                        className="btn btn-danger"
                    >
                        Aggiungi Moto
                    </Link>

                </div>

            ) : (

                <div className="row g-4">

                    {motorcycles.map((motorcycle) => (

                        <div
                            className="col-lg-4 col-md-6"
                            key={motorcycle._id}
                        >
                            <MotoCard motorcycle={motorcycle} />
                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Garage;
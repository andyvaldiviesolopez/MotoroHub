import { Link } from "react-router-dom";

import "../styles/notFound.css";

function NotFound() {
    return (
        <div className="notfound-page">

            <div className="notfound-card fade-up">

                <div className="notfound-icon">

                    <i className="bi bi-exclamation-circle-fill"></i>

                </div>

                <h1 className="notfound-code">
                    404
                </h1>

                <h2 className="notfound-title">
                    Pagina non trovata
                </h2>

                <p className="notfound-text">
                    La pagina che stai cercando non esiste oppure è stata spostata.
                </p>

                <div className="notfound-buttons">

                    <Link
                        to="/"
                        className="btn btn-danger"
                    >
                        <i className="bi bi-house-fill me-2"></i>
                        Torna alla Home
                    </Link>

                    <Link
                        to="/garage"
                        className="btn btn-outline-danger"
                    >
                        <i className="bi bi-speedometer2 me-2"></i>
                        Il mio Garage
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default NotFound;
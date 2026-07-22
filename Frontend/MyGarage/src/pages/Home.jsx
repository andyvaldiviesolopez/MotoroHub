import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {

    const { user, isAuthenticated } = useAuth();

    return (
        <div className="container py-5">

            <div className="text-center mt-5">

                <h1 className="display-3 fw-bold">
                    MotoroHub
                </h1>

                {isAuthenticated ? (
                    <p>Ciao {user.firstName} 👋</p>
                ) : (
                    <p>Non hai ancora effettuato il login.</p>
                )}
                <p className="lead mt-4">
                    Gestisci le tue moto, condividile con la community
                    e crea il tuo garage virtuale.
                </p>

                <Link
                    to="/garage"
                    className="btn btn-dark btn-lg mt-4"
                >
                    Entra nel Garage
                </Link>

            </div>

        </div>
    );
}

export default Home;
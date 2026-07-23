import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroImage from "../assets/hero/transalp.jpg";
import "../styles/home.css";

function Home() {
    const { user, isAuthenticated } = useAuth();

    return (
        <div className="container py-5">

            <section className="hero">

                <div className="hero-image">

                    <img
                        src={heroImage}
                        alt="Honda in montagna"
                    />

                </div>

                <div className="hero-content">

                    <h1>
                        La community
                        <span> dedicata ai motociclisti.</span>
                    </h1>

                    {isAuthenticated ? (

                        <>
                            <p className="hero-welcome">
                                Bentornato <strong>{user.firstName}</strong> 👋
                            </p>

                            <p>
                                Condividi la tua moto, scopri nuovi modelli
                                e connettiti con <strong>appassionati</strong>{" "}
                                da tutta Italia.
                            </p>

                            <div className="hero-buttons">

                                <Link
                                    to="/community"
                                    className="btn btn-danger"
                                >
                                    Community
                                </Link>

                                <Link
                                    to="/favorites"
                                    className="btn btn-outline-danger"
                                >
                                    Preferiti
                                </Link>

                            </div>

                        </>

                    ) : (

                        <>
                            <p>
                                Condividi la tua moto, scopri nuovi modelli e
                                connettiti con{" "}
                                <strong>appassionati</strong>{" "}
                                da tutta Italia.
                            </p>

                            <div className="hero-buttons">

                                <Link
                                    to="/login"
                                    className="btn btn-danger"
                                >
                                    Accedi
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn btn-outline-danger"
                                >
                                    Registrati
                                </Link>

                            </div>

                        </>

                    )}

                    <div className="hero-features">

                        <div>

                            <i className="bi bi-speedometer2 me-2"></i>

                            <h5>Le mie moto</h5>

                            <p>
                                Gestisci le tue moto, amplia il tuo garage acquistando altre moto.
                            </p>

                        </div>

                        <div>

                            <i className="bi bi-people"></i>

                            <h5>Community</h5>

                            <p>
                                Scopri moto e conosci
                                altri motociclisti.
                            </p>

                        </div>

                        <div>

                            <i className="bi bi-heart"></i>

                            <h5>Preferiti</h5>

                            <p>
                                Salva le moto che ami
                                e ritrovale facilmente.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;
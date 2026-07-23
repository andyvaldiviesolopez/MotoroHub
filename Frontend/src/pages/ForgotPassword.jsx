import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/api";

import "../styles/forgotPassword.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        setLoading(true);

        setMessage("");
        setIsError(false);

        try {

            const data = await forgotPassword(email);

            setMessage(data.message);

            setEmail("");

        } catch (err) {

            setIsError(true);

            setMessage(

                err.response?.data?.message ||

                "Si è verificato un errore. Riprova più tardi."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="forgot-container fade-up">

            <div className="forgot-card">

                <h2>Reimposta la password</h2>

                <p>

                    Inserisci l'indirizzo email associato al tuo account.
                    Se è registrato, riceverai un link per scegliere una nuova password.

                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Invio..."
                                : "Invia email"
                        }

                    </button>

                </form>

                {
                    message && (

                        <div
                            className={
                                isError
                                    ? "forgot-error"
                                    : "forgot-success"
                            }
                        >

                            {message}

                        </div>

                    )
                }

                <Link
                    to="/login"
                    className="forgot-back"
                >

                    ← Torna al login

                </Link>

            </div>

        </div>

    );

}

export default ForgotPassword;
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import { resetPassword } from "../services/api";

import "../styles/forgotPassword.css";

function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        setMessage("");
        setIsError(false);

        if (password !== confirmPassword) {

            setIsError(true);

            setMessage("Le password non coincidono.");

            return;

        }

        setLoading(true);

        try {

            const data = await resetPassword(
                token,
                password
            );

            setMessage(data.message);

            setShowSuccessModal(true);

        } catch (err) {

            setIsError(true);

            setMessage(

                err.response?.data?.message ||

                "Il link non è valido oppure è scaduto."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="forgot-container fade-up">

            <div className="forgot-card">

                <h2>Nuova password</h2>

                <p>

                    Inserisci la nuova password del tuo account.

                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        placeholder="Nuova password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Conferma password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Aggiornamento..."

                                : "Reimposta password"

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

            <SuccessModal
                show={showSuccessModal}
                title="Password aggiornata!"
                message="La tua password è stata aggiornata con successo. Ora puoi effettuare il login."
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate("/login");
                }}
            />
        </div>

    );

}

export default ResetPassword;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../services/api";
import "../styles/changePassword.css";

function ChangePassword() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {
            setError("Compila tutti i campi.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Le nuove password non coincidono.");
            return;
        }

        try {
            await changePassword(user.id, {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            setSuccess("Password modificata con successo!");

            setTimeout(() => {
                navigate("/profile");
            }, 1500);

        } catch (err) {
            setError(err.message);
        }
    };

    return (

        <div className="change-password-page">

            <div className="change-password-card fade-up">

                <div className="change-password-header">

                    <i className="bi bi-shield-lock-fill"></i>

                    <h1>

                        Cambia <span>Password</span>

                    </h1>

                    <p>

                        Aggiorna la password del tuo account per mantenere il profilo al sicuro.

                    </p>

                </div>

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}

                {success && (

                    <div className="alert alert-success">

                        {success}

                    </div>

                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">

                            Password attuale

                        </label>

                        <input
                            type={showPasswords ? "text" : "password"}
                            className="form-control"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Nuova password

                        </label>

                        <input
                            type={showPasswords ? "text" : "password"}
                            className="form-control"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Conferma nuova password

                        </label>

                        <input
                            type={showPasswords ? "text" : "password"}
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-check custom-check">

                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="showPasswords"
                            checked={showPasswords}
                            onChange={() => setShowPasswords(!showPasswords)}
                        />

                        <label
                            className="form-check-label"
                            htmlFor="showPasswords"
                        >

                            Mostra password

                        </label>

                    </div>

                    <div className="password-buttons">

                        <button
                            type="submit"
                            className="btn btn-danger"
                        >

                            <i className="bi bi-check-circle me-2"></i>

                            Salva Password

                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/profile")}
                        >

                            <i className="bi bi-x-circle me-2"></i>

                            Annulla

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default ChangePassword;
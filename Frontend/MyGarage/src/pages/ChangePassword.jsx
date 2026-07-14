import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../services/api";

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
        <div
            className="container py-5"
            style={{ maxWidth: "600px" }}
        >

            <h1 className="text-center mb-4">
                Cambia Password
            </h1>

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

                <div className="mb-3">

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

                <div className="form-check mb-4">

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
                        👁 Mostra password
                    </label>

                </div>

                <div className="d-flex gap-3">

                    <button
                        type="submit"
                        className="btn btn-warning"
                    >
                        🔒 Cambia Password
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/profile")}
                    >
                        Annulla
                    </button>

                </div>

            </form>

        </div>
    );
}

export default ChangePassword;
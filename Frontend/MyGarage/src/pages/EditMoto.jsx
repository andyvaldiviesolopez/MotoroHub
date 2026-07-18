import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMotorcycleById, updateMotorcycle } from "../services/api";
import brands from "../data/brands";
import motorcycleData from "../data/motorcycleData";

function EditMoto() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        year: "",
        cilindrata: "",
        power: "",
        kilometers: "",
        color: "",
        image: "",
        description: "",
        isForSale: false,
        price: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMotorcycle() {
            try {
                const motorcycle = await getMotorcycleById(id);

                setFormData({
                    brand: motorcycle.brand || "",
                    model: motorcycle.model || "",
                    year: motorcycle.year || "",
                    cilindrata: motorcycle.cilindrata || "",
                    power: motorcycle.power || "",
                    kilometers: motorcycle.kilometers || "",
                    color: motorcycle.color || "",
                    image: motorcycle.image || "",
                    description: motorcycle.description || "",
                    isForSale: motorcycle.isForSale || false,
                    price: motorcycle.price || "",
                });

            } catch (err) {
                setError(err.message);
            }
        }

        loadMotorcycle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const motorcycleData = {
                ...formData,
                year: Number(formData.year),
                cilindrata: Number(formData.cilindrata),
                power: formData.power
                    ? Number(formData.power)
                    : undefined,
                kilometers: formData.kilometers
                    ? Number(formData.kilometers)
                    : 0,
                price: formData.isForSale
                    ? Number(formData.price)
                    : null,
            };

            await updateMotorcycle(id, motorcycleData);

            navigate("/garage");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container py-5">

            <h1 className="mb-4">
                Modifica Moto
            </h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="row">

                    {/* Marca */}
                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Marca
                        </label>

                        <select
                            className="form-select"
                            name="brand"
                            value={formData.brand}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    brand: e.target.value,
                                    model: "",
                                })
                            }
                            required
                        >

                            <option value="">
                                Seleziona una marca
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

                    {/* Modello */}
                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Modello
                        </label>

                        <select
                            className="form-select"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            disabled={!formData.brand}
                            required
                        >

                            <option value="">
                                {formData.brand
                                    ? "Seleziona un modello"
                                    : "Prima scegli una marca"}
                            </option>

                            {formData.brand &&
                                motorcycleData[formData.brand].map((model) => (

                                    <option
                                        key={model}
                                        value={model}
                                    >
                                        {model}
                                    </option>

                                ))}

                        </select>

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Anno
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Cilindrata (cc)
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="cilindrata"
                            value={formData.cilindrata}
                            onChange={handleChange}
                            required
                        />

                    </div>
                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Potenza (CV)
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="power"
                            value={formData.power}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Chilometri
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="kilometers"
                            value={formData.kilometers}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Colore
                        </label>

                        <input
                            className="form-control"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            URL Immagine
                        </label>

                        <input
                            className="form-control"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Descrizione
                    </label>

                    <textarea
                        rows="5"
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-check mb-3">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="isForSale"
                        checked={formData.isForSale}
                        onChange={handleChange}
                        id="saleCheck"
                    />

                    <label
                        className="form-check-label"
                        htmlFor="saleCheck"
                    >
                        Moto in vendita
                    </label>

                </div>

                {formData.isForSale && (

                    <div className="mb-4">

                        <label className="form-label">
                            Prezzo (€)
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />

                    </div>

                )}

                <div className="d-flex gap-3">

                    <button
                        type="submit"
                        className="btn btn-warning"
                    >
                        💾 Salva Modifiche
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/garage")}
                    >
                        Annulla
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditMoto;
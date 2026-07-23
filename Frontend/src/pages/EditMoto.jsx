import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import brands from "../data/brands";
import motorcycleData from "../data/motorcycleData";

import { getMotorcycleById, updateMotorcycle, uploadMotorcycleImage, } from "../services/api";

import "../styles/form.css";

function EditMoto() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState("");

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

                setPreview(motorcycle.image || "");

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
            [name]: type === "checkbox"
                ? checked
                : value,

        }));

    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);

        setPreview(URL.createObjectURL(file));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const motorcycle = {

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

            await updateMotorcycle(id, motorcycle);

            if (selectedImage) {

                await uploadMotorcycleImage(id, selectedImage);

            }

            navigate("/garage");

        } catch (err) {

            setError(err.message);

        }

    };

    return (

        <div className="add-page">

            <div className="container py-5">

                <div className="add-card fade-up">

                    <div className="add-header">

                        <h1>

                            Modifica <span>Moto</span>

                        </h1>

                        <p>

                            Aggiorna le informazioni della tua moto.

                        </p>

                    </div>

                    {error && (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="image-preview-wrapper">

                            {preview ? (

                                <img
                                    src={preview}
                                    alt="Anteprima"
                                    className="preview-image"
                                />

                            ) : (

                                <div className="empty-preview">

                                    <i className="bi bi-image"></i>

                                    <p>

                                        Nessuna immagine

                                    </p>

                                </div>

                            )}

                        </div>

                        <h4 className="section-title">

                            Informazioni principali

                        </h4>

                        <div className="row">
                            <div className="col-md-6 mb-4">

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

                            <div className="col-md-6 mb-4">

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

                            <div className="col-md-6 mb-4">

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

                            <div className="col-md-6 mb-4">

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

                            <div className="col-md-6 mb-4">

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

                            <div className="col-md-6 mb-4">

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

                            <div className="col-md-6 mb-4">

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

                            <div className="col-md-6 mb-4">

                                <label className="form-label">

                                    Immagine

                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />

                            </div>

                        </div>

                        <h4 className="section-title">

                            Informazioni aggiuntive

                        </h4>

                        <div className="mb-4">

                            <label className="form-label">

                                Descrizione

                            </label>

                            <textarea
                                rows="6"
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                        </div>
                        <div className="sale-box">

                            <div className="form-check form-switch">

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

                                    Metti questa moto in vendita

                                </label>

                            </div>

                            {formData.isForSale && (

                                <div className="mt-4">

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

                        </div>

                        <div className="d-flex gap-3 flex-wrap">

                            <button
                                type="submit"
                                className="btn btn-danger add-button"
                            >

                                <i className="bi bi-check-circle me-2"></i>

                                Salva modifiche

                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary add-button"
                                onClick={() => navigate("/garage")}
                            >

                                <i className="bi bi-x-circle me-2"></i>

                                Annulla

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditMoto;
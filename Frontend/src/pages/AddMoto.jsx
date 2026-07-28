import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { createMotorcycle } from "../services/api";

import brands from "../data/brands";
import motorcycleData from "../data/motorcycleData";

import "../styles/form.css";

function AddMoto() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    cilindrata: "",
    power: "",
    kilometers: "",
    color: "",
    description: "",
    isForSale: false,
    price: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setImage(file);
    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const data = new FormData();

      data.append("brand", formData.brand);
      data.append("model", formData.model);
      data.append("year", Number(formData.year));
      data.append("cilindrata", Number(formData.cilindrata));

      data.append(
        "power",
        formData.power
          ? Number(formData.power)
          : ""
      );

      data.append(
        "kilometers",
        formData.kilometers
          ? Number(formData.kilometers)
          : 0
      );

      data.append("color", formData.color);
      data.append("description", formData.description);
      data.append("isForSale", formData.isForSale);

      if (formData.isForSale) {

        data.append(
          "price",
          Number(formData.price)
        );

      }

      if (image) {

        data.append("image", image);

      }

      await createMotorcycle(data);

      navigate("/garage");

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="add-page">

      <div className="container py-5">

        <div className="add-card fade-up">

          <div className="add-header">

            <h1>
              Aggiungi una <span>Moto</span>
            </h1>

            <p>
              Condividi la tua moto con tutta la community MotoroHub.
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
                    Nessuna immagine selezionata
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
                  value={formData.brand}
                  disabled={loading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brand: e.target.value,
                      model: "",
                    })
                  }
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
                  disabled={!formData.brand || loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
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
                  disabled={loading}
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
                    disabled={loading}
                    required
                  />

                </div>

              )}

            </div>

            <button
              type="submit"
              className="btn btn-danger add-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Salvataggio...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle me-2"></i>
                  Salva Moto
                </>
              )}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddMoto;
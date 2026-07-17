import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMotorcycle } from "../services/api";
import brands from "../data/brands";

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
    image: "",
    description: "",
    isForSale: false,
    price: "",
  });

  const [error, setError] = useState("");

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
        power: formData.power ? Number(formData.power) : undefined,
        kilometers: formData.kilometers
          ? Number(formData.kilometers)
          : 0,
        price: formData.isForSale
          ? Number(formData.price)
          : null,
      };

      await createMotorcycle(motorcycleData);

      navigate("/garage");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">

      <h1 className="mb-4">Aggiungi Moto</h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="col-md-6 mb-3">

            <label className="form-label">
              Marca
            </label>

            <select
              className="form-select"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
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

          <div className="col-md-6 mb-3">
            <label className="form-label">Modello</label>
            <input
              className="form-control"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Anno</label>
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
            <label className="form-label">Cilindrata (cc)</label>
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
            <label className="form-label">Potenza (CV)</label>
            <input
              type="number"
              className="form-control"
              name="power"
              value={formData.power}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Chilometri</label>
            <input
              type="number"
              className="form-control"
              name="kilometers"
              value={formData.kilometers}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Colore</label>
            <input
              className="form-control"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">URL Immagine</label>
            <input
              className="form-control"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="mb-3">
          <label className="form-label">Descrizione</label>

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

        <button
          type="submit"
          className="btn btn-dark"
        >
          Salva Moto
        </button>

      </form>

    </div>
  );
}

export default AddMoto;
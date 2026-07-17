const mongoose = require("mongoose")

const MotorcycleSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            enum: [
                "Aprilia",
                "Benelli",
                "BMW",
                "CFMOTO",
                "Ducati",
                "GasGas",
                "Harley-Davidson",
                "Honda",
                "Husqvarna",
                "Kawasaki",
                "KTM",
                "Moto Guzzi",
                "MV Agusta",
                "Suzuki",
                "Triumph",
                "Yamaha"
            ]
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        cilindrata: {
            type: Number,
            required: true,
        },
        power: {
            type: Number,
        },
        kilometers: {
            type: Number,
            default: 0,
        },
        color: {
            type: String,
        },
        image: {
            type: String,
            default: "",
        },
        description: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        isForSale: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true, strict: true,
    }
);

module.exports = mongoose.model("motorcycles", MotorcycleSchema, "motorcycles")
const express = require("express")
const motorcycles = express.Router()

const motorcycleController = require("./motorcycle.controller")
const verifyJWT = require("../middleware/verifyJWT")
const upload = require("../middleware/multer")


motorcycles.patch("/motorcycles/:id/image", verifyJWT, upload.single("image"), motorcycleController.uploadMotorcycleImage);

motorcycles.post("/motorcycles", verifyJWT, motorcycleController.createMotorcycle)
motorcycles.post("/motorcycles/:id/contact", verifyJWT, motorcycleController.contactSeller);

motorcycles.get("/motorcycles", verifyJWT, motorcycleController.getMotorcycles)
motorcycles.get("/motorcycles/me", verifyJWT, motorcycleController.getMyMotorcycles
)
motorcycles.get("/motorcycles/:id", verifyJWT, motorcycleController.getMotorcycleById)

motorcycles.patch("/motorcycles/:id", verifyJWT, motorcycleController.updateMotorcycle)

motorcycles.delete("/motorcycles/:id", verifyJWT, motorcycleController.deleteMotorcycle)

module.exports = motorcycles
const motorcycleService = require("./motorcycle.service")

const createMotorcycle = async (req, res) => {
    try {

        const newMotorcycle = await motorcycleService.createMotorcycle(
            req.body,
            req.user.id
        )

        res.status(201).send({
            statusCode: 201,
            message: "Moto creata con successo ✅",
            newMotorcycle
        })

    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).send({
                statusCode: 400,
                message: error.message
            })
        }

        console.log(error)

        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })
    }
}

const getMotorcycles = async (req, res) => {
    try {

        const motorcycles = await motorcycleService.getMotorcycles()

        res.status(200).send({
            statusCode: 200,
            motorcycles
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode: 500,
            message: "Errore durante il recupero delle moto ❌"
        })
    }
}

const getMyMotorcycles = async (req, res) => {

    try {

        const motorcycles = await motorcycleService.getMyMotorcycles(req.user.id)

        res.status(200).send({
            statusCode: 200,
            motorcycles
        })

    } catch (error) {

        console.log(error)

        res.status(500).send({
            statusCode: 500,
            message: "Errore nel recupero del garage"
        })

    }

}

const getMotorcycleById = async (req, res) => {
    try {

        const motorcycle = await motorcycleService.getMotorcycleById(req.params.id)

        res.status(200).send({
            statusCode: 200,
            motorcycle
        })

    } catch (error) {
        console.log(error)
        res.status(404).send({
            statusCode: 404,
            message: "Moto non trovata ❌"
        })
    }
}

const updateMotorcycle = async (req, res) => {
    try {

        const updatedMotorcycle = await motorcycleService.updateMotorcycle(
            req.params.id,
            req.body,
            req.user.id
        )

        res.status(200).send({
            statusCode: 200,
            message: "Moto aggiornata ✅",
            updatedMotorcycle
        })

    } catch (error) {

        if (error.message === "Moto non trovata") {
            return res.status(404).send({
                statusCode: 404,
                message: `${error.message} ❌`
            })
        }

        if (error.message === "Non sei autorizzato") {
            return res.status(403).send({
                statusCode: 403,
                message: `${error.message} ❌`
            })
        }

        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })

    }
}

const deleteMotorcycle = async (req, res) => {
    try {

        const deletedMotorcycle = await motorcycleService.deleteMotorcycle(
            req.params.id,
            req.user.id
        )

        res.status(200).send({
            statusCode: 200,
            message: "Moto eliminata ✅",
            deletedMotorcycle
        })

    } catch (error) {

        if (error.message === "Moto non trovata") {
            return res.status(404).send({
                statusCode: 404,
                message: `${error.message} ❌`
            })
        }

        if (error.message === "Non sei autorizzato") {
            return res.status(403).send({
                statusCode: 403,
                message: `${error.message} ❌`
            })
        }

        res.status(500).send({
            statusCode: 500,
            message: "Errore interno del server"
        })

    }
}

module.exports = {
    createMotorcycle,
    getMotorcycles,
    getMotorcycleById,
    updateMotorcycle,
    deleteMotorcycle,
    getMyMotorcycles
}
const Motorcycle = require("./motorcycle.schema")

const createMotorcycle = async (body, userId) => {
    const newMotorcycle = await Motorcycle.create({
        ...body,
        owner: userId
    })
    return newMotorcycle
}

const getMotorcycles = async () => {
    const motorcycles = await Motorcycle.find().populate("owner", "-password")
    return motorcycles
}

const getMyMotorcycles = async (userId) => {
    const motorcycles = await Motorcycle.find({
        owner: userId
    }).populate("owner", "-password")

    return motorcycles
}

const getMotorcycleById = async (id) => {

    const motorcycle = await Motorcycle.findById(id)
        .populate("owner", "-password")

    if (!motorcycle) {
        throw new Error("Moto non trovata ❌")
    }

    return motorcycle
}

const updateMotorcycle = async (id, body, userId) => {

    const motorcycle = await Motorcycle.findById(id)

    if (!motorcycle) {
        throw new Error("Moto non trovata")
    }

    if (motorcycle.owner.toString() !== userId) {
        throw new Error("Non sei autorizzato")
    }

    const updatedMotorcycle = await Motorcycle.findByIdAndUpdate(
        id,
        body,
        { new: true }
    )

    return updatedMotorcycle
}

const deleteMotorcycle = async (id, userId) => {

    const motorcycle = await Motorcycle.findById(id)

    if (!motorcycle) {
        throw new Error("Moto non trovata")
    }

    if (motorcycle.owner.toString() !== userId) {
        throw new Error("Non sei autorizzato")
    }

    const deletedMotorcycle = await Motorcycle.findByIdAndDelete(id)

    return deletedMotorcycle
}

module.exports = {
    createMotorcycle,
    getMotorcycles,
    getMotorcycleById,
    updateMotorcycle,
    deleteMotorcycle,
    getMyMotorcycles
}
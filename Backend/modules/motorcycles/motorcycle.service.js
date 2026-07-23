const Motorcycle = require("./motorcycle.schema")
const User = require("../users/user.schema");
const { sendContactSellerEmail } = require("../services/emailService");

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

const uploadMotorcycleImage = async (id, userId, imageUrl) => {

    const motorcycle = await Motorcycle.findById(id);

    if (!motorcycle) {
        throw new Error("Moto non trovata");
    }

    if (motorcycle.owner.toString() !== userId) {
        throw new Error("Non sei autorizzato");
    }

    motorcycle.image = imageUrl;

    await motorcycle.save();

    return motorcycle;
};

const contactSeller = async (motorcycleId, buyerId, message) => {

    if (!message || message.trim() === "") {
        throw new Error("Il messaggio non può essere vuoto");
    }

    const motorcycle = await Motorcycle.findById(motorcycleId)
        .populate("owner");

    if (!motorcycle) {
        throw new Error("Moto non trovata");
    }

    if (!motorcycle.isForSale) {
        throw new Error("Questa moto non è in vendita");
    }

    const buyer = await User.findById(buyerId);

    if (!buyer) {
        throw new Error("Utente non trovato");
    }

    if (motorcycle.owner._id.toString() === buyerId) {
        throw new Error("Non puoi contattare te stesso");
    }

    await sendContactSellerEmail(
        motorcycle.owner,
        buyer,
        motorcycle,
        message
    );

    return true;
};

module.exports = {
    createMotorcycle,
    getMotorcycles,
    getMotorcycleById,
    updateMotorcycle,
    deleteMotorcycle,
    getMyMotorcycles,
    uploadMotorcycleImage,
    contactSeller
}
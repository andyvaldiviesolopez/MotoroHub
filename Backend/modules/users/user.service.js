const User = require("./user.schema.js")
const Motorcycle = require("../motorcycles/motorcycle.schema.js");
const bcrypt = require("bcrypt")

const createUser = async (body) => {

    const emailExists = await User.findOne({
        email: body.email
    });

    if (emailExists) {
        throw new Error("Email già registrata");
    }

    const usernameExists = await User.findOne({
        username: body.username
    });

    if (usernameExists) {
        throw new Error("Username già in uso");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        email: body.email,
        password: hashedPassword,
        birthday: body.birthday,
        avatar: body.avatar,
        bio: body.bio,
        city: body.city
    });

    return newUser;
};

const getUsers = async () => {
    const users = await User.find()
    return users
}

const getUserById = async (id) => {
    const user = await User.findById(id)
    return user
}

const updateUser = async (id, body) => {

    // Se la password è vuota, non modificarla
    if (!body.password) {
        delete body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        body,
        { new: true }
    );

    return updatedUser;
}

const changePassword = async (id, body) => {

    const { currentPassword, newPassword } = body;

    const user = await User.findById(id);

    if (!user) {
        throw new Error("Utente non trovato");
    }

    const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Password attuale non corretta");
    }

    const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password
    );

    if (isSamePassword) {
        throw new Error(
            "La nuova password deve essere diversa da quella attuale"
        );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return user;
};

const deleteUser = async (id) => {

    await Motorcycle.deleteMany({

        owner: id

    });

    return await User.findByIdAndDelete(id);

};

const getFavorites = async (userId) => {

    const user = await User.findById(userId)
        .populate("favorites");

    if (!user) {
        throw new Error("Utente non trovato");
    }

    return user.favorites;
};

const addFavorite = async (userId, motorcycleId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utente non trovato");
    }

    const motorcycle = await Motorcycle.findById(motorcycleId);

    if (!motorcycle) {
        throw new Error("Moto non trovata");
    }

    const alreadyFavorite = user.favorites.some(
        favorite => favorite.toString() === motorcycleId
    );

    if (alreadyFavorite) {
        throw new Error("Moto già nei preferiti");
    }

    user.favorites.push(motorcycleId);

    await user.save();

    return user.favorites;
};

const removeFavorite = async (userId, motorcycleId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utente non trovato");
    }

    user.favorites = user.favorites.filter(
        (favorite) => favorite.toString() !== motorcycleId
    );

    await user.save();

    return user.favorites;
};

const uploadAvatar = async (userId, avatarUrl) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("Utente non trovato");
    }

    user.avatar = avatarUrl;

    await user.save();

    return user;
};


module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    changePassword,
    deleteUser,
    getFavorites,
    addFavorite,
    removeFavorite,
    uploadAvatar
}
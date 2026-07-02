const userSchema = require("./user.schema.js")
const User = require("./user.schema.js")

const createUser = async (req) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        avatar: req.body.avatar,
        bio: req.body.bio,
        city: req.body.city
    })

    return newUser
}

const getUsers = async () => {
    const users = await User.find()
    return users
}

const getUserById = async (id) => {
    const user = await User.findById(id)
    return user
}

const updateUser = async (id, body) => {
    const updateUser = await User.findByIdAndUpdate(
        id,
        body,
        { new: true }
    )

    return updateUser
}

const deleteUser = async (id) => {
    const deleteUser = await User.findByIdAndDelete(id)
    return deleteUser
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}
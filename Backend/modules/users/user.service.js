const User = require("./user.schema.js")
const bcrypt = require("bcrypt")

const createUser = async (body) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

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
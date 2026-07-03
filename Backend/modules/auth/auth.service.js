const User = require("../users/user.schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (body) => {
    const { email, password } = body
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Email o password non validi ❌")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        throw new Error("Email o password non validi ❌")
    }


    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    )

    return {
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }
    }
}


module.exports = {
    login
}
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    avatar: {
        type: String,
        default: "https://i.pravatar.cc/300"
    },
    bio: {
        type: String,
        maxlength: 500,
        default: ""
    },
    city: {
        type: String,
        default: ""
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model("user", UserSchema, "users")
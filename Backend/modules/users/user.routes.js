const express = require("express")
const users = express.Router()

const userController = require("./user.controller")


users.post("/users", userController.createUser)

users.get("/users", userController.getUsers)
users.get("/users/:id", userController.getUserById)

users.patch("/users/:id", userController.updateUser)

users.delete("/users/:id", userController.deleteUser)

module.exports = users

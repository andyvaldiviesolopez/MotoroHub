const express = require("express")
const users = express.Router()
const userController = require("./user.controller")
const verifyJWT = require("../middleware/verifyJWT")

users.post("/users", userController.createUser)

users.get("/users",verifyJWT, userController.getUsers)
users.get("/users/:id",verifyJWT, userController.getUserById)

users.patch("/users/:id",verifyJWT, userController.updateUser)
users.patch("/users/:id/password",verifyJWT,userController.changePassword);
users.delete("/users/:id",verifyJWT, userController.deleteUser)

module.exports = users

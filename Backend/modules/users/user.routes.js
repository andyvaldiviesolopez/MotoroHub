const express = require("express")
const users = express.Router()
const userController = require("./user.controller")
const verifyJWT = require("../middleware/verifyJWT")

users.post("/users", userController.createUser)
users.post("/users/favorites/:motorcycleId",verifyJWT, userController.addFavorite)

users.get("/users",verifyJWT, userController.getUsers)
users.get("/users/favorites",verifyJWT, userController.getFavorites)
users.get("/users/:id",verifyJWT, userController.getUserById)

users.patch("/users/:id",verifyJWT, userController.updateUser)
users.patch("/users/:id/password",verifyJWT,userController.changePassword);

users.delete("/users/:id",verifyJWT, userController.deleteUser)
users.delete("/users/favorites/:motorcycleId", verifyJWT, userController.removeFavorite)

module.exports = users

const express = require("express")
const auth = express.Router()

const authController = require("./auth.controller")

auth.post("/login", authController.login)
auth.post("/forgot-password", authController.forgotPassword);
auth.post("/reset-password", authController.resetPassword);

module.exports = auth
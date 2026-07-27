require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { liveServer } = require("./config/database")
const errorHandler = require("./modules/middleware/errorHandler");

const PORT = process.env.PORT

const usersRoutes = require("./modules/users/user.routes")
const authRoutes = require("./modules/auth/auth.routes")
const motorcyclesRoutes = require("./modules/motorcycles/motorcycle.routes")

const server = express()

server.use(cors())
server.use(express.json())

server.use("/", usersRoutes)
server.use("/auth", authRoutes)
server.use("/", motorcyclesRoutes)
server.use(errorHandler)

liveServer(PORT, server)
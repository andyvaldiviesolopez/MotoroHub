require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { liveServer } = require("./config/database")

const PORT = process.env.PORT

const users = require("./modules/users/user.routes")

const server = express()

server.use(cors())
server.use(express.json())

server.use("/", users)

liveServer(PORT, server)
const mongoose = require("mongoose")

const mongoUri = process.env.MONGODB_URI

const getConnection = async () => {
    try {
        await mongoose.connect(mongoUri)
        console.log("Database connected successfully 🆗")
    } catch (error) {
        console.error("Cannot connect to the database ❌")
        throw error
    }
}

const liveServer = async (port, server) => {
    try {
        await getConnection()

        server.listen(port, () => {
            console.log(`Server up and connected on port ${port}`)
        })
    } catch (error) {
        console.error("Unable to start server")
    }
}

module.exports = {
    liveServer
}
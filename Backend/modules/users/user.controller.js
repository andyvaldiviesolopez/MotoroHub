const userService = require("./user.service")

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(201)
            .send({
                statusCode: 201,
                message: "Utente creato correttamente ✅",
                newUser
            })
    } catch (error) {
        console.log(error)
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore durante la creazione dell'utente ❌"
            })
    }
}

const getUsers = async (req, res) => {
    console.log(req.user)
    try {
        const getUsers = await userService.getUsers(req)
        res.status(200)
            .send({
                statusCode: 200,
                message: "Utenti trovati! ✅",
                getUsers
            })
    } catch (error) {
        console.log(error)
        res.status(500)
            .send({
                statusCode: 500,
                message: "Errore durante la ricezione degli utenti ❌"
            })
    }
}

const getUserById = async (req, res) => {
    try {
        const getUser = await userService.getUserById(req.params.id)
        res.status(200)
            .send({
                statusCode: 200,
                message: `Utente con ID ${req.params.id} trovato✅`,
                getUser
            })
    } catch (error) {
        console.log(error)
        res.status(404)
            .send({
                statusCode: 404,
                message: `Utente con ID ${req.params.id} non trovato o non disponibile ❌`
            })
    }
}

const updateUser = async (req, res) => {
    try {
        const updateUser = await userService.updateUser(
            req.params.id,
            req.body
        )

        res.status(200).send({
            statusCode: 200,
            message:`Utente con ID ${req.params.id} modificato con successo! 🆗`,
            updateUser
        })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore durante la modifica dell'utente ❌",
            error: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await userService.deleteUser(req.params.id)
        res.status(200)
            .send({
                statusCode: 200,
                message: `Utente con ID ${ req.params.id} eliminato ✅🆗`,
                deleteUser
            })
    } catch (error) {
        res.status(404)
            .send({
                statusCode: 404,
                message: `Utente con ID ${req.params.id} non trovato ❌😅`
            })
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}
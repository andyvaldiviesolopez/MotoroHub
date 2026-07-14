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

        if (
            error.message === "Email già registrata" ||
            error.message === "Username già in uso"
        ) {

            return res.status(409).send({
                statusCode: 409,
                message: error.message
            });

        }

        console.log(error);

        res.status(500).send({
            statusCode: 500,
            message: "Errore durante la creazione dell'utente ❌"
        });

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
        if (req.user.id !== req.params.id) {
            return res.status(403).send({
                statusCode: 403,
                message: "Non sei autorizzato ❌"
            });
        }
        const updatedUser = await userService.updateUser(
            req.params.id,
            req.body
        )

        res.status(200).send({
            statusCode: 200,
            message: `Utente con ID ${req.params.id} modificato con successo! 🆗`,
            updatedUser
        })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Errore durante la modifica dell'utente ❌",
            error: error.message
        })
    }
}

const changePassword = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).send({
                statusCode: 403,
                message: "Non sei autorizzato ❌"
            });
        }
        await userService.changePassword(
            req.params.id,
            req.body
        );

        res.status(200).send({
            statusCode: 200,
            message: "Password modificata con successo ✅"
        });

    } catch (error) {

        if (
            error.message ===
            "La nuova password deve essere diversa da quella attuale"
        ) {
            return res.status(400).send({
                statusCode: 400,
                message: error.message
            });
        }

        if (error.message === "Utente non trovato") {
            return res.status(404).send({
                statusCode: 404,
                message: error.message
            });
        }

        if (
            error.message === "Password attuale non corretta"
        ) {
            return res.status(401).send({
                statusCode: 401,
                message: error.message
            });
        }

        if (req.user.id !== req.params.id) {
            return res.status(403).send({
                statusCode: 403,
                message: "Non sei autorizzato"
            });
        }

        res.status(500).send({
            statusCode: 500,
            message: error.message
        });

    }
};

const deleteUser = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).send({
                statusCode: 403,
                message: "Non sei autorizzato ❌"
            });
        }
        const deleteUser = await userService.deleteUser(req.params.id)
        res.status(200)
            .send({
                statusCode: 200,
                message: `Utente con ID ${req.params.id} eliminato ✅🆗`,
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
    changePassword,
    deleteUser
}
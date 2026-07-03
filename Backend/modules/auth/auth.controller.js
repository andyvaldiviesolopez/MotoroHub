const authService = require("./auth.service")

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body)

        res.status(200).send({
            statusCode: 200,
            message: "Login effettuato con successo! ✅",
            ...result
        })

    } catch (error) {
        res.status(401).send({
            statusCode: 401,
            message: error.message
        })
    }
}

module.exports = {
    login
}
const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({
            statusCode: 401,
            message: "Token mancante o non valido"
        })
    }

    const token = authHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        req.user = decoded

        next()

    } catch (error) {

        return res.status(401).send({
            statusCode: 401,
            message: "Token non valido o scaduto"
        })

    }

}

module.exports = verifyJWT
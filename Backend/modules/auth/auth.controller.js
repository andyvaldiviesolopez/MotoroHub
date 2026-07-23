const User = require("../users/user.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authService = require("./auth.service")
const { sendResetPasswordEmail } = require("../services/emailService");


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

const forgotPassword = async (req, res, next) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(200).json({

                message:
                    "Se l'indirizzo email è registrato, riceverai un link per reimpostare la password."

            });

        }

        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "15m"
            }

        );

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await sendResetPasswordEmail(
            user,
            resetUrl
        );

        res.status(200).json({

            message: "Email inviata con successo."

        });

    } catch (error) {

        next(error);

    }

};

const resetPassword = async (req, res, next) => {

    try {

        const {
            token,
            password
        } = req.body;

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            payload.id
        );

        if (!user) {

            return res.status(404).json({

                message: "Utente non trovato."

            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({

            message: "Password aggiornata con successo."

        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    login,
    forgotPassword,
    resetPassword
}
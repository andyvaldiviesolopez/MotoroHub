const brevo = require("../../config/brevo");
const welcomeTemplate = require("../templates/welcomeTemplate");
const contactSellerTemplate = require("../templates/contactSellerTemplate");

const sendWelcomeEmail = async (user) => {
    const email = {
        sender: {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_NOREPLY_EMAIL
        },
        to: [
            {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`
            }
        ],
        subject: "🏍 Benvenuto su MotoroHub!",
        htmlContent: welcomeTemplate(user)
    };

    return await brevo.transactionalEmails.sendTransacEmail(email);
};

const sendContactSellerEmail = async (
    seller,
    buyer,
    motorcycle,
    message
) => {

    const email = {
        sender: {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_CONTACT_EMAIL
        },

        to: [
            {
                email: seller.email,
                name: `${seller.firstName} ${seller.lastName}`
            }
        ],

        replyTo: {
            email: buyer.email,
            name: `${buyer.firstName} ${buyer.lastName}`
        },

        subject: `📩 Nuovo messaggio per la tua ${motorcycle.brand} ${motorcycle.model}`,

        htmlContent: contactSellerTemplate(
            seller,
            buyer,
            motorcycle,
            message
        )
    };

    await brevo.transactionalEmails.sendTransacEmail(email);

};

module.exports = {
    sendWelcomeEmail,
    sendContactSellerEmail
};
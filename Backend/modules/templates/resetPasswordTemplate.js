const emailLayout = require("./emailLayout");

const resetPasswordTemplate = (user, resetUrl) => {

    return emailLayout({

        title: `Ciao ${user.firstName}! 🔒`,

        subtitle: "Richiesta di reimpostazione della password",

        body: `

            <p>
                Abbiamo ricevuto una richiesta per reimpostare la password del tuo account MotoroHub.
            </p>

            <p>
                Se sei stato tu, clicca sul pulsante qui sotto per scegliere una nuova password.
            </p>

            <p>
                Per motivi di sicurezza, il link sarà valido per <strong>15 minuti</strong>.
            </p>

            <p>
                Se non hai richiesto questa operazione, puoi ignorare questa email. La tua password rimarrà invariata.
            </p>

        `,

        buttonText: "Reimposta password",

        buttonUrl: resetUrl

    });

};

module.exports = resetPasswordTemplate;
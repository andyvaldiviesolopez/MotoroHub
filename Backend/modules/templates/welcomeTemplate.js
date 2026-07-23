const emailLayout = require("./emailLayout");

const welcomeTemplate = (user) => {

    return emailLayout({

        title: `Benvenuto ${user.firstName}! 👋`,

        subtitle:
            "Grazie per esserti registrato su MotoroHub.",

        body: `

        <p>
            Siamo felici di averti nella nostra community.
        </p>

        <table
            width="100%"
            cellpadding="12"
            cellspacing="0"
            style="
                background:#f8f9fa;
                border-radius:12px;
                margin-top:20px;
            "
        >

            <tr>

                <td>🏍 Gestisci il tuo garage</td>

            </tr>

            <tr>

                <td>❤️ Salva le tue moto preferite</td>

            </tr>

            <tr>

                <td>💰 Metti in vendita le tue moto</td>

            </tr>

            <tr>

                <td>🌍 Esplora la community</td>

            </tr>

        </table>

        <p style="margin-top:25px;">
            Ti auguriamo buon divertimento!
        </p>

        `

    });

};

module.exports = welcomeTemplate;
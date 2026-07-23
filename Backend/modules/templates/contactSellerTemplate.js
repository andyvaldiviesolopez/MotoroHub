const emailLayout = require("./emailLayout");

const contactSellerTemplate = (
    seller,
    buyer,
    motorcycle,
    message
) => {

    return emailLayout({

        title: `Ciao ${seller.firstName}! 👋`,

        subtitle: "Hai ricevuto un nuovo messaggio per una delle tue moto.",

        body: `

            <p>
                Un utente della community è interessato al tuo annuncio.
            </p>

            <table
                width="100%"
                cellpadding="12"
                cellspacing="0"
                style="
                    background:#f8f9fa;
                    border-radius:12px;
                    margin:25px 0;
                "
            >

                <tr>

                    <td>

                        <strong>🏍 Moto</strong>

                        <br><br>

                        ${motorcycle.brand} ${motorcycle.model}

                        <br>

                        ${motorcycle.year} • ${motorcycle.color}

                    </td>

                </tr>

            </table>

            <p>

                <strong>Messaggio ricevuto:</strong>

            </p>

            <div
                style="
                    background:#f8f9fa;
                    padding:20px;
                    border-left:4px solid #dc3545;
                    border-radius:10px;
                    line-height:1.8;
                    white-space:pre-wrap;
                "
            >

                ${message}

            </div>

            <p style="margin-top:30px;">

                <strong>Mittente</strong>

                <br>

                ${buyer.firstName} ${buyer.lastName}

                <br>

                <a
                    href="mailto:${buyer.email}"
                    style="color:#dc3545;text-decoration:none;"
                >

                    ${buyer.email}

                </a>

            </p>

            <p>

                Puoi rispondere direttamente a questa email:
                il messaggio arriverà automaticamente al mittente.

            </p>

        `

    });

};

module.exports = contactSellerTemplate;
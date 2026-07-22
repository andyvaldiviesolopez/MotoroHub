const contactSellerTemplate = (
    seller,
    buyer,
    motorcycle,
    message
) => {

    return `
        <div style="font-family: Arial, sans-serif; line-height:1.6">

            <h2>Ciao ${seller.firstName}! 👋</h2>

            <p>
                <strong>${buyer.firstName} ${buyer.lastName}</strong>
                è interessato alla tua moto.
            </p>

            <hr>

            <h3>Moto</h3>

            <p>
                ${motorcycle.brand} ${motorcycle.model}
                (${motorcycle.year})
            </p>

            <h3>Messaggio</h3>

            <blockquote style="border-left:4px solid #ccc;padding-left:15px;">
                ${message}
            </blockquote>

            <hr>

            <p>
                Ti basterà cliccare su <strong>Rispondi</strong> per contattare direttamente l'acquirente.
            </p>

            <p>
                Buona strada! 🏍️
            </p>

            <p>
                <strong>Team MotoroHub</strong>
            </p>

        </div>
    `;

};

module.exports = contactSellerTemplate;
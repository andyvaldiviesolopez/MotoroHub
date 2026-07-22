const welcomeTemplate = (user) => {
    return `
        <h1>Benvenuto ${user.firstName}!</h1>

        <p>
            Grazie per esserti registrato su <strong>MotoroHub</strong>.
        </p>

        <p>
            Da oggi puoi:
        </p>

        <ul>
            <li>🏍 Gestire il tuo garage</li>
            <li>❤️ Salvare le moto preferite</li>
            <li>💰 Mettere in vendita le tue moto</li>
            <li>🌍 Esplorare la community</li>
        </ul>

        <p>
            Buona permanenza! 🏍
        </p>
    `;
};

module.exports = welcomeTemplate;
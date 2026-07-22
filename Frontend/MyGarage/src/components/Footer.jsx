import "../styles/footer.css";

function Footer() {
    return (
        <footer className="motorohub-footer">

            <div className="container">

                <h5 className="footer-logo">
                    Motoro<span>Hub</span>
                </h5>

                <p className="footer-description">
                    La community dedicata agli appassionati di moto.
                    Crea il tuo garage, condividi le tue passioni e scopri
                    le moto degli altri utenti.
                </p>

                <div className="footer-divider"></div>

                <p className="footer-copy">
                    © 2026 MotoroHub - Tutti i diritti riservati.
                </p>

            </div>

        </footer>
    );
}

export default Footer;
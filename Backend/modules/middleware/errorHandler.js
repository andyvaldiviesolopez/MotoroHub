const multer = require("multer");

const errorHandler = (err, req, res, next) => {

    // Errore Multer (dimensione file, ecc.)
    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "L'immagine non può superare i 15 MB."
            });
        }

        return res.status(400).json({
            message: err.message
        });
    }

    // Altri errori
    return res.status(err.status || 500).json({
        message: err.message || "Errore interno del server."
    });
};

module.exports = errorHandler;
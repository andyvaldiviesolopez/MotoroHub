# 🏍️ MotoroHub

Una moderna web application dedicata agli appassionati di moto per gestire il proprio garage virtuale, condividere motociclette e metterle in vendita.

---

# 📖 Descrizione

MotoroHub è una web application Full Stack sviluppata come progetto finale del corso **Full Stack Web Developer Part Time** di Epicode.

L'applicazione permette agli appassionati di motociclismo di creare il proprio garage virtuale, gestire le proprie moto, metterle in vendita e contattare direttamente gli altri utenti interessati/per acquistare altre moto.

---

# ✨ Funzionalità

- 👤 Registrazione utente
- 🔐 Login con autenticazione JWT
- 🔑 Recupero password tramite email
- 🖼️ Upload dell'avatar
- 🏍️ Garage personale
- ➕ Inserimento di nuove motociclette
- ✏️ Modifica delle motociclette
- 🗑️ Eliminazione delle motociclette
- ❤️ Gestione delle moto preferite
- 💰 Pubblicazione di una moto in vendita
- 📩 Contatto diretto con il venditore tramite email
- 📱 Interfaccia responsive

---

# 🛠️ Tecnologie utilizzate

## Frontend

- React
- Vite
- React Router DOM
- React Bootstrap
- Bootstrap 5
- Bootstrap Icons
- React Icons
- HTML5
- CSS3
- JavaScript (ES6+)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Multer
- Cloudinary
- Multer Storage Cloudinary
- Brevo API
- Validator.js
- dotenv
- CORS

## Database

- MongoDB
- MongoDB Compass

## Servizi esterni

- Cloudinary
- Brevo
---

# 📁 Struttura del progetto

MotoroHub/
│
├── Backend/
│   ├── config/
│   ├── modules/
│   ├── package.json
│   └── ...
│
└── Frontend/
    ├── src/
    ├── package.json
    └── ...

---

# ⚙️ Installazione

Clonare il repository

```bash
git clone https://github.com/andyvaldiviesolopez/MotoroHub.git
```

Entrare nella cartella del progetto

```bash
cd MotoroHub
```

### Avvio del Backend

```bash
cd Backend
npm install
npm run dev
```

### Avvio del Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

# 🔑 Variabili d'ambiente

## Backend

Creare un file `.env` all'interno della cartella **Backend**.

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
BREVO_API_KEY=
BREVO_SENDER_NOREPLY_EMAIL=
BREVO_SENDER_CONTACT_EMAIL=
FRONTEND_URL=
```

## Frontend

Creare un file `.env` all'interno della cartella **Frontend**.

```env
VITE_API_URL=
```

# 🌍 Demo Online

**Frontend**

> In arrivo

**Backend API**

> In arrivo

---

# 🚀 Possibili sviluppi futuri

- 🔔 Verifica email durante registrazione
- 💡 Dark mode
- 🔎 Visualizzazione account utenti

---

# 👨‍💻 Autore

Sviluppato da **Andy**

Progetto Finale - Corso **Full Stack Web Developer Part Time** di **Epicode**
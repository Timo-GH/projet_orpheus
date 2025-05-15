const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();

// Configuration EJS
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuration body-parser
app.use(express.json()); // Parse les données JSON
app.use(express.urlencoded({extended: true})); // Parse les données des form HTML

// Configuration session
app.use (
    session({
        secret: process.env.SESSION_SECRET, // Charge la clé depuis .env
        resave: false,  // Save la session que si elle est modifiée
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL, // Charge l'URL depuis .env
            collectionName: 'sessions', // Collection pour stocker les sessions
        }),
        cookie: { 
            httpOnly: true, // Protège contre les attaques XSS (à vérifier)
            secure: process.env.NODE_ENV === 'production', // /!\ A ACTIVER QUAND PASSAGE EN HTTPS
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        }
    })
);

// Gestion fichiers statiques
app.use(express.static('public'));

// Configuration CORS
app.use(cors({
    origin: process.env.SERVER_URL,
    credentials: true, // Autorise les cookies
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', formRoutes);

app.post("/test", (req, res) => {
    res.status(200).json({ success: true, message: "CORS et session OK" });
});

module.exports = app;
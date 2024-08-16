import express, { json, urlencoded } from 'express';

const app = express();

//  importation de path pour gerer les chemins d'acces
import path from "path";

//  importation de cors pour gerer la communication avec les serveurs externes
import cors from 'cors';

//  importation de morgan pour ... 
import morgan from 'morgan';

//  importation de helmet pour securiser mes requettes
import helmet from 'helmet';

//  importation de cookie-parser pour gerer les cookies
import cookieParser from 'cookie-parser';

//  importation des routes
import createRdv from "./routes/rdv.routes.js";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import rdvRoutes from "./routes/rendezVous.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import demandeRoutes from "./routes/demande.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import newslettersRoutes from "./routes/newsLetter.routes.js";
import commentaireRoutes from "./routes/commentaire.routes.js";

//  importation de la fonction de creation des dossiers pour les images
import { createAllFolder } from './config/folders.config.js';

//  creation des dossiers manquants
createAllFolder();

//  configuration de morgan
app.use(morgan("dev"));

//  configuration de helmet
app.use(helmet());

//  configuration de la conversion des cookies
app.use(cookieParser());

//  configuration de cors pour les adresses externes
app.use(cors());

//  coniguration dee express
app.use(json());

//  configuration du dossier public pour les images
// app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.static(path.join('src', 'public')));

// Configurer le dossier public pour servir les fichiers statiques
// app.use('/uploads', express.static(path.join(path.resolve(), 'src/public/upload/users')));

//  configuration de l'encodage des url
app.use(urlencoded({ extended: false }));

// configuration de cors
app.use(cors({
    origin: 'http://localhost:4200',    // autorise les requettes depuis l'application angular
    methods: [
        'GET',  //  requettes de recuperation de donnée sur un serveur
        'POST',  //  requettes d'envoi de donnée sur un serveur
        'PUT',  //  requettes de mise a jour de donnée sur un serveur
        'DELETE',  //  requettes de suppression de donnée sur un serveur
        'OPTIONS'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ]
}));

// app.use(cors({
//     origin: '*',    // autorise les requettes depuis l'application angular
//     methods: [
//         'GET',  //  requettes de recuperation de donnée sur un serveur
//         'POST',  //  requettes d'envoi de donnée sur un serveur
//         'PUT',  //  requettes de mise a jour de donnée sur un serveur
//         'DELETE',  //  requettes de suppression de donnée sur un serveur
//         'OPTIONS'
//     ],
//     allowedHeaders: [
//         'Content-Type',
//         'Authorization'
//     ]
// }));

//  gestion des erreurs
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        message: 'une erreur est survenue dans le serveur'
    });
    next();
});

//  configuration des routes 
app.use('/api', authRoutes);
app.use('/api/rdv', rdvRoutes);
app.use('/api/user', userRoutes);
app.use('/api/create', createRdv);
app.use('/api/contacts', contactRoutes);
app.use('/api/demandes', demandeRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/newsletters', newslettersRoutes);
app.use('/api/commentaires', commentaireRoutes);


export default app;
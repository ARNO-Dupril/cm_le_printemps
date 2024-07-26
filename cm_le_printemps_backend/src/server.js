// require('dotenv').config();
import 'dotenv/config';
import app from './app.js';
import { mongoDbConnection } from './config/connect.config.js';

const port = process.env.PORT || 3000;
const dbUrl = process.env.CONNECTION_STRING ;

//  lancement du serveur
app.listen(port, () => {
    mongoDbConnection(dbUrl);
    console.log(`\n===============[+]      http://localhost:${port}      [+]===============\n`);
    // console.log(`le serveur est lancé sur a l'adresse: http://localhost:${port}`);
});
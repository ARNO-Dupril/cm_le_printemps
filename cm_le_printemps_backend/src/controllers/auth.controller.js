// require('dotenv').config();
import 'dotenv/config'

import { toTitleCase, isValidEmail, isExistingEmail, isExistingPhoneNumber } from '../utils/verification.utils.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getAdmin, getAllUsers, postSignup, getLogin} from '../services/auth.services.js';
import * as authServicesJs from "../services/auth.services.js";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      await authServicesJs.getAdmin(loggedInUserId)
      .then(data => data.json())
      .then((loggedInUserRole) => {
      res.json({ role: loggedInUserRole.userRole });
      })
      .catch(err => console.log("une erreur est survenue: ",err));
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await authServicesJs.getAllUsers();
      return res.json({
        success: true,
        message: "liste de tout les utilisateurs",
        users: allUser,
      });
    } catch(err) {
      console.log(err);
      // return res.status(404).json({error: err});
      if (!res.headersSent) {
        res.status(404).json({
          error: err.message,
        });
      }
    }
  }

  /* User.controller  Inscription/Signup (post)  */
  async signup(req, res) {
    try {
        console.log("Début du contrôleur d'inscription");

        // Récupérer les données du formulaire
        const { password, cPassword, email, nom, prenom, username, telephone } = req.body;

        // Appeler le service postSignup
        const response = await postSignup(password, cPassword, email, nom, prenom, username, telephone);

        // Vérifier le résultat
        if (!response.success) {
            // Renvoyer l'erreur
            return res.status(400).json(response.error);
        }

        // Renvoyer la réponse de succès
        return res.status(201).json({
            message: response.message,
            data: response.data,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Une erreur est survenue lors de l'inscription",
        });
    }
};

  /*
  async signup(req, res) {
    let { nom, prenom, username, email, telephone, password, cPassword } = req.body;
    let error = {};
    if (!nom || !prenom || !username || !email || !password || !cPassword) {
      error = {
        ...error,
        nom: "Ce champ ne doit pas etre vide",
        prenom: "Ce champ ne doit pas etre vide",
        userame: "Ce champ ne doit pas etre vide",
        telephone: "Ce champ ne doit pas etre vide",
        email: "Ce champ ne doit pas etre vide",
        password: "Ce champ ne doit pas etre vide",
        cPassword: "Ce champ ne doit pas etre vide",
      };
      return res.json({
        success: false, 
        error: error 
      });
    }
    if (nom.length < 3 || nom.length > 25 || prenom.length < 3 || prenom.length > 25) {
      error = { ...error, nom: "le nom et le prenom doivent avoir au moins 3 caracteres et au plus 25 caracteres" };
      return res.json({
        success: false, 
        error: error, 
        });
    } else {
      if (isValidEmail(email)) {
        nom = toTitleCase(nom);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "le mot de passe doit contenir au moins 8 caracteres ",
            nom: "",
            prenom: "",
            username: "",
            telephone: "",
            email: "",
          };
          return res.json({
            success: false, 
            error: error, 
        });
        } else {
          // si l'email et le telephone existent dans la base de donnée
          if(!isExistingEmail(email) || !isExistingPhoneNumber(telephone | "")){
            authServicesJs.postSignup(password, email);
          }
         
        }
      } else {
        error = {
          ...error,
          password: "",
          nom: "",
          prenom: "",
          username: "",
          telephone: "",
          email: "Adresse Email invalide",
        };
        return res.json({ 
            success: false,
            error: error }
        );
      }
    }
  }
  */

  /* User.controller Connexion/Login/Signin  (post) */
  async login(req, res) {
    let { email, password } = req.body;
    console.log("input password: ",password);
    if (!email || !password) {
      return res.json({
        success: false,
        error: "ces champs ne doivent pas etre vide",
      });
    }
    try {
      let data = await authServicesJs.getLogin(email);
      if (!data) {
        return res.json({
            success: false,
            error: "Email ou Mot de passe invalide",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, email: data.email, role: data.userRole },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          req.loggedInUserId = data._id;
          return res.json({
            success: true,
            message: "connection reussi",
            data: data,
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            success: false,
            error: "Email ou mot de passe invalide",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
export default authController;

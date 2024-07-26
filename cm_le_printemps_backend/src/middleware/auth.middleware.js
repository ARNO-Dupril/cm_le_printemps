// require('dotenv').config();
import * as userModelJs from "../models/user.model.js";
import 'dotenv/config';
import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// loginCheck
export function loginCheck(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Jeton d'authentification manquant" });
    }
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.userDetails = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Erreur d'authentification" });
  }
}

// isAuth
export function isAuth(req, res, next) {
  if (!req.userDetails._id || req.userDetails._id !== req.body.loggedInUserId) {
    return res.status(403).json({ error: "Vous n'êtes pas autorisé" });
  }
  next();
}

// isAdmin
export async function isAdmin(req, res, next) {
  try {
    const reqUser = await userModelJs.Users.findById(req.userDetails._id);
    if (reqUser.userRole === 1) {
      next();
    } else {
      return res.status(403).json({ error: "Accès refusé" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}


/*
//  verifie l'etat de la connection
export function loginCheck(req, res, next) {
  try {
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    const decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;
    console.log(req.userDetails);
    next();
  } catch (err) {
    console.log({error: err});
    res.json({
      error: "veillez vous connecter",
    });
  }
}

//  verifie l'authentification de l'utilisateur
export function isAuth(req, res, next) {
  let { loggedInUserId } = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ){
    res.status(403).json({ error: "vous n'etes pas authentifié" });
  }
  next();
}

//  verifie si l'utilisateur est admin ou pas
export async function isAdmin(req, res, next) {
  try {
    let reqUser = await userModelJs.Users.findById(req.body.loggedInUserId);
    // If user role 0 that's mean not admin it's customer
    if (reqUser.userRole === 1) {
      res.status(200).json({ message: "acces accordé" });
      console.log("acces accordé");
      next();
    }
    res.status(403).json({ message: "acces refusé" });
  } catch {
    res.status(404);
  }
}
*/
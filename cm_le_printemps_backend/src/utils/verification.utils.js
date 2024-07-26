//  fonctions de verification des données de notre base de donnée avant insertion

// import User from '../models/user.model.js';
import * as userModelJs from "../models/user.model.js";

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

//  verifie si la syntaxe de l'email est valide
export const isValidEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  };
  
//  verifie si l'email existe deja dans la table
  export const isExistingEmail = async (email) => {
    let user = await userModelJs.Users.findOne({ email: email });
    return !!user;
    console.log("verification d'email reussi");
    // user.exec((err, data) => {
    //   if (!data) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
  };
  
//  verifie si le numero de telephone existe dans la base de données
  export const isExistingPhoneNumber = async (phoneNumber) => {
    let user = await userModelJs.Users.findOne({ telephone: phoneNumber });
    return !!user;
    console.log("verification de numero reussi");
    // user.exec((err, data) => {
    //   if (data) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
  };
  
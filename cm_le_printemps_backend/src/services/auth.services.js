// import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import * as userModelJs from "../models/user.model.js";

// verifie s'il est admin
export async function getAdmin(id){
    return await userModelJs.Users.findById(id);
}

// recupere tout les utilisateur
export async function getAllUsers(){
    return await userModelJs.Users.find({});
}

//   inscription d'un utilisateur (post)
export async function postSignup(password, confirmPassword, email, nom, prenom, username, telephone) {
    try {
        // Vérifier que les mots de passe correspondent
        if (password !== confirmPassword) {
            return {
                success: false,
                error: {
                    password: "Les mots de passe ne correspondent pas",
                }
            };
        }
        // Hasher le mot de passe
        password = bcrypt.hashSync(password, 10);

        // Vérifier si l'email existe déjà
        const utilisateurExistant = await userModelJs.Users.findOne({ email });
        if (utilisateurExistant) {
            return {
                success: false,
                error: {
                    email: "Cet email existe déjà",
                }
            };
        }

        // Créer un nouvel utilisateur
        const nouvelUtilisateur = new userModelJs.Users({
            nom,
            prenom,
            username,
            email,
            telephone,
            password,
            userRole: 0, // 0 pour un utilisateur standard, 1 pour un administrateur
        });

        // Enregistrer le nouvel utilisateur
        const utilisateurEnregistre = await nouvelUtilisateur.save();

        console.log("Fin de l'inscription");
        return {
            success: true,
            message: "Compte créé avec succès, veuillez vous connecter",
            data: utilisateurEnregistre,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            error: {
                general: "Une erreur est survenue lors de la création du compte",
            }
        };
    }
}

/*
export async function postSignup(password, email) {
    // return await reqData.save();
    console.log("start post signup");

    try {
        password = bcrypt.hashSync(password, 10);
        const data = await userModelJs.Users.findOne({ email: email });
        if (data) {
        error = {
            ...error,
            nom: "",
            prenom: "",
            username: "",
            telephone: "",
            password: "",
            email: "cet Email existe deja",
        };
        return res.json({
            success: false, 
            error: error, 
        });
        } else {
            let newUser = new userModel({
                nom,
                prenom,
                username,
                email,
                telephone,
                password,
                // ========= ici l'admin a le role 1 et l'utilisateur a le role 0 =========
                userRole: 0, 
            });
            console.log("stop post signup");

            await newUser.save().then((data) => {
                return res.json({
                    success: true,
                    message: "compte creer avec succes, veillez vous connecter",
                    data: data,
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    } catch (err) {
        console.log(err);
    }
}
*/

// connection d'un utilisateur
export async function getLogin(email){
    const data = await userModelJs.Users.findOne({ email: email });
    return data;
}
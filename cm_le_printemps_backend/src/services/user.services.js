// import { User } from "../models/user.model.js";
import * as userModelJs from "../models/user.model.js";
import bcrypt from "bcryptjs";

// recuperation de tout les utilisateurs (get)
export async function getAllUser() {
    return await userModelJs.Users.find().sort({ _id: -1 });
}  

//   recuperation d'un utilisateur par son Id (get)
export async function getUser(id) {
    return await userModelJs.Users.findById(id).select("nom prenom username email telephone profil updatedAt createdAt");
}

//   ajout d'un utilisateur (post)
export async function postAddUser(reqData) {
    console.log("start add user");

    let {
        nom,
        prenom,
        username,
        telephone,
        email,
        password,
        profil,
        verified,
        secretKey,
        history
    } = reqData;

    password =  bcrypt.hashSync(password, 10);
    let newData = new userModelJs.Users({
        nom,
        prenom,
        username,
        telephone,
        email,
        password,
        profil,
        verified,
        secretKey,
        history,
    });
    console.log("stop add user");

    return await newData.save();
}

//   edition d'un utilisateur (post)
export async function postEditUser(reqData) {
    let { userId, username, telephone } = reqData;
    let currentUser = userModelJs.Users.findByIdAndUpdate(userId, {
        username: username,
        telephone: telephone,
        updatedAt: Date.now(),
    });
    return await currentUser.exec();
}

//   suppression d'un utilisateur (get)
export async function getDeleteUser(id) {
    let currentUser = userModelJs.Users.findByIdAndUpdate(id);
    return await currentUser.exec();
}

//   changement du mot de passe (post)
export async function postChangePassword(reqData) {
    let { userId, oldPassword, newPassword } = reqData;

    const data = await userModelJs.Users.findOne({ _id: userId });
    if (!data) {
        return res.json({
          success: false,
          error: true,
          message: "Utilisateur Invalide",
        });
    } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
            try {
                let result = userModelJs.Users.findByIdAndUpdate(userId, {
                        password: newPassword,
                    });
                return res.json({ 
                    success: true,
                    error: false,
                    message: "mise a jour du mot de passe reussie", 
                    data: result,
                });
            } catch (error) {
                console.log(err);
            }
        } else {
            return res.json({
                success: false,
                error: true,
                message: "l'ancien mode de passe est incorrect",
            });
        }
    }
}



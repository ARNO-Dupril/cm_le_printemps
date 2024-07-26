// import { Users } from '../models/user.model.js';
import * as userModelJs from "../models/user.model.js";
import { getAllUser, getUser, postAddUser, postEditUser, getDeleteUser, postChangePassword } from '../services/user.services.js';

class User {
  // recuperation de tout les utilisateurs (get)
  async allUser(req, res) {
    try {
      let Users = await getAllUser();
      if (Users) {
        return res.json({  
            success: true,
            message: `liste de tout les utilisateurs `,
            users: Users,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

//   recuperation d'un utilisateur par son Id (get)
  async user(req, res) {
    let { userId } = req.body;
    if (!userId) {
      return res.json({ 
        success: false,
        error: true,
        message: "Veillez remplir tout les champs" ,
      });
    } else {
      try {
        let User = await getUser(id);
        if (User) {
          return res.json({ 
            success: true,
            message: `utilisateur ayant pour Id: ${userId} `,
            user: User, 
        });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

//   ajout d'un utilisateur (post)
  async addUser(req, res) {
    let { nom, prenom, username, telephone, email, password, profil, verified, secretKey, history } = req.body;
    if (
      !nom ||
      !prenom ||
      !username ||
      !telephone ||
      !email ||
      !password
    ) {
      return res.json({ message: "veillez remplir tout les champs" });
    } else {
      try {
        let save = await postAddUser(req.body);
        if (save) {
          return res.json({ 
            success: true ,
            message: "utilisateur creer avec succes",
        });
        }
      } catch (error) {
        console.log("erreur:", error);
        return res.json({
            success: false, 
            error: true,
            message: error, 
        });
      }
    }
  }

//   edition d'un utilisateur (post)
  async editUser(req, res) {
    let { userId, username, telephone } = req.body;
    if (!userId || !username || !telephone) {
      return res.json({ message: "Veillez remplir tout les champs" });
    } else {
        try {
            let result = postEditUser(req.body);
            return res.json({ 
                success: true,
                message: "Utilisateur mis a jour avec succes",
                data: result, 
            });
        } catch (error) {
            console.log(error);
        }
    }
  }

//   suppression d'un utilisateur (get)
  async deleteUser(req, res) {
    let { userId } = req.body;
    if (!userId) {
      return res.json({ message: "Veillez remplir tout les champs" });
    } else {
        try {
            let usr = await getDeleteUser(userId);
            return res.json({ 
                success: true,
                message: "Utilisateur supprimé avec succes" ,
                data: usr,
            });
        } catch (error) {
            console.log(err);
        }
    
    }
  }

//   changement du mot de passe (post)
  async changePassword(req, res) {
    let { userId, oldPassword, newPassword } = req.body;
    if (!userId || !oldPassword || !newPassword) {
      return res.json({ message: "Veillez remplir tout les champs" });
    } else {
      await postChangePassword(req.body);
    }
  }
}

const userController = new User();
export default userController;

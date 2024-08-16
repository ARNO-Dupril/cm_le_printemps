import userController from '../controllers/user.controller.js';
import { Router } from 'express';
import { upload } from '../middleware/upload.middleware.js';
const router = Router();

//  l'utilisation de bind(userController) c'est pour garder l'instance de notre userController

/**
 * @router instance de express.Router qui permet de gerer les routes
 * @post | @get utiliser pour specifier la methode de notre requette si l'on doit envoyer ou recevoir
 * @param '/routes' c'est la route sur laquelle l'on souhaite executer notre requette
 * @param 'controller.fonction.bind(controller)' c'est la fonction a executer sur la route tout en gardant l'instance actuelle
*/

//  routes get
router.get('/all-users', userController.allUser.bind(userController));

//  router post
router.post('/single-user', userController.user.bind(userController));
router.post('/del-user', userController.deleteUser.bind(userController));
router.post('/add-users', upload('users', 'profil'), userController.addUser.bind(userController));
// router.post('/add-users', uploadImage('users').fields([
//     { name: 'nom', maxCount: 1 },
//     { name: 'prenom', maxCount: 1 },
//     { name: 'username', maxCount: 1 },
//     { name: 'telephone', maxCount: 1 },
//     { name: 'email', maxCount: 1 },
//     { name: 'password', maxCount: 1 },
//     { name: 'profil', maxCount: 1 },
//     { name: 'verified', maxCount: 1 },
//     { name: 'secretKey', maxCount: 1 },
//     { name: 'history', maxCount: 1 }
//   ]), userController.addUser.bind(userController));
router.post('/edit-user', userController.editUser.bind(userController));
router.post('/change-password', userController.changePassword.bind(userController));

export default router;
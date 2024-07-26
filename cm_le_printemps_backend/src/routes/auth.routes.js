import { loginCheck, isAuth, isAdmin } from "../middleware/auth.middleware.js";
import authController from "../controllers/auth.controller.js";
import { Router } from "express";
const router = Router();

//  routes get

//  routes post
router.post('/isAdmin', authController.isAdmin.bind(authController));
router.post('/signup', authController.signup.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post(
    '/user', 
    loginCheck, 
    isAuth, 
    isAdmin, 
    authController.allUser.bind(authController),
);

export default router;
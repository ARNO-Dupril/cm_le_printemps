import express from "express";
import commentaireController from "../controllers/commentaire.controller.js";

const router = express.Router();

router.post("/add-commentaire", commentaireController.createCommentaire);
router.get("/", commentaireController.getAllCommentaires);
router.get("/:id", commentaireController.getCommentaireById);
router.put("/update-commentaire/:id", commentaireController.updateCommentaire);
router.delete("/delete-commentaire/:id", commentaireController.deleteCommentaire);

export default router;
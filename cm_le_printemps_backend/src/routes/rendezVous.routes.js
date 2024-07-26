import express from "express";
import rdvController from "../controllers/rendezVous.controller.js";

const router = express.Router();

router.post("/add-rdv", rdvController.createRdv);
router.get("/", rdvController.getAllRdvs);
router.get("/:id", rdvController.getRdvById);
router.put("/update-rdv/:id", rdvController.updateRdv);
router.delete("/delete-rdv/:id", rdvController.deleteRdv);

export default router;
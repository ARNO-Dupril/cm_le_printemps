import express from "express";
import demandeController from "../controllers/demande.controller.js";

const router = express.Router();

router.post("/add-demande", demandeController.createDemande);
router.get("/", demandeController.getAllDemande);
router.get("/:id", demandeController.getDemandeById);
router.put("/update-demande/:id", demandeController.updateDemande);
router.delete("/delete-demande/:id", demandeController.deleteDemande);

export default router;
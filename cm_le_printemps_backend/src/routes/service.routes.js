import express from "express";
import serviceController from "../controllers/service.controller.js";

const router = express.Router();

router.post("/add-service", serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.put("/update-service/:id", serviceController.updateService);
router.delete("/delete-service/:id", serviceController.deleteService);

export default router;
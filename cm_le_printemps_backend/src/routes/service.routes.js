import express from "express";
import serviceController from "../controllers/service.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/add-service", upload('services', 'image'), serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.put("/update-service/:id", upload('services', 'image'), serviceController.updateService);
router.delete("/delete-service/:id", serviceController.deleteService);

export default router;
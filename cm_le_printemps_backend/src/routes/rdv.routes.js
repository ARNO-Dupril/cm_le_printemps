import express from "express";
import createRdvController from "../controllers/rdv.controller.js";

const router = express.Router();

router.post("/create-rdv", createRdvController.create);

export default router;
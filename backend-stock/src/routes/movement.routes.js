import { Router } from "express";
import { createMovement } from "../controllers/movementController.js";

const router = Router();

router.post("/", createMovement);

export default router;

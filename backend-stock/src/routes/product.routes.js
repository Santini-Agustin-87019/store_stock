import { getAllProducts } from "../controllers/productController.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllProducts);

export default router;

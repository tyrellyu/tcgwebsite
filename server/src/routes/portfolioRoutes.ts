import { Router } from "express";
import { getPortfolioByCategory } from "../controllers/portfolioController";

const router = Router();

router.get("/", getPortfolioByCategory);

export default router;
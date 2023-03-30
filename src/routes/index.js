import { Router } from "express";
import { systemRouter } from "./system.routers.js";
import { journeyRouter } from "./journey.routres.js";

export const router = Router();

router.use("/system", systemRouter);
router.use("/journey", journeyRouter);



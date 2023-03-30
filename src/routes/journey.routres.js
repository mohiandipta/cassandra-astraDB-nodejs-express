import express from "express";
import * as JourneyController from "../controller/journey.controller.js";

export const journeyRouter = express.Router();

journeyRouter.get("/", JourneyController.Index);

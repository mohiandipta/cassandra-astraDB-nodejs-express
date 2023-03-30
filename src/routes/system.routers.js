import express from "express"
import * as SystemController from "../controller/system.controller.js"

export const systemRouter = express.Router()

systemRouter.get("/", SystemController.Index)

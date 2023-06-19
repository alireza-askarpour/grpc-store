import express from "express"
import * as categoryController from "../controllers/category.controller"

const router = express.Router()

router.post("/", categoryController.createCategory)

export default router

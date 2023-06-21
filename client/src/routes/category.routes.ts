import express from "express"
import * as categoryController from "../controllers/category.controller"

const router = express.Router()

router.post("/", categoryController.createCategory)
router.patch("/:id", categoryController.updateCategory)
router.delete("/:id", categoryController.removeCategory)

export default router

import express from "express"

import * as productControllers from "../controllers/product.controller"
import { verifyAccessToken } from "../middlewares/verifyAccessToken"
import { uploadImage } from "../middlewares/upload.middleware"
import { stringToArray } from "../middlewares/string-to-array.middleware"

const router = express.Router()

router.post(
  "/",
  verifyAccessToken,
  uploadImage.array("images"),
  stringToArray("tags"),
  productControllers.createProduct
)

router.patch(
  "/:id",
  verifyAccessToken,
  uploadImage.array("images"),
  stringToArray("tags"),
  productControllers.updateProduct
)

export default router

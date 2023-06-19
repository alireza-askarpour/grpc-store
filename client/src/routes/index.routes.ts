import express from "express"

import homeRoutes from "./home.routes"
import authRoutes from "./auth.routes"
import categoryRoutes from "./category.routes"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/category", categoryRoutes)
router.use(homeRoutes)

export default router

import express from "express"

import homeRoutes from "./home.routes"
import authRoutes from "./auth.routes"

const router = express.Router()

router.use("/auth", authRoutes)
router.use(homeRoutes)

export default router

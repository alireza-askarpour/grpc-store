import express from "express"

import homeRoutes from "./home.routes"

const router = express.Router()

router.use(homeRoutes)

export default router

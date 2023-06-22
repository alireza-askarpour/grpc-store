import express from "express"

import homeRoutes from "./home.routes"
import accountRoutes from "./account.routes"
import categoryRoutes from "./category.routes"
import productRoutes from "./product.routes"

const router = express.Router()

router.use("/account", accountRoutes)
router.use("/category", categoryRoutes)
router.use("/product", productRoutes)
router.use(homeRoutes)

export default router

import express from "express"
import { checkOtp, getMe, getOtp, addToBasket, removeFromBasket } from "../controllers/account.controller"
import { verifyAccessToken } from "../middlewares/verifyAccessToken"

const router = express.Router()

router.post("/get-otp", getOtp)
router.post("/check-otp", checkOtp)
router.get("/me", verifyAccessToken, getMe)
router.patch("/basket/add/:productId", verifyAccessToken, addToBasket)
router.patch("/basket/remove/:productId", verifyAccessToken, removeFromBasket)

export default router

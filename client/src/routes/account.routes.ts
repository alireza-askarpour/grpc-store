import express from "express"
import { checkOtp, getMe, getOtp } from "../controllers/account.controller"
import { verifyAccessToken } from "../middlewares/verifyAccessToken"

const router = express.Router()

router.post("/get-otp", getOtp)
router.post("/check-otp", checkOtp)
router.get("/me", verifyAccessToken, getMe)

export default router

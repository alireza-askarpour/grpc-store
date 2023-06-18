import express from "express"
import { checkOtp, getOtp } from "../controllers/auth.controller"

const router = express.Router()

router.post("/get-otp", getOtp)
router.post("/check-otp", checkOtp)

export default router

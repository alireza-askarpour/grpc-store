import path from "path"
import express, { Response } from "express"
import HttpStatus from "http-status-codes"

const router = express.Router()
const homeDir = path.join(__dirname, "..", "pages", "home.html")

router.get("/", (_, res: Response) => {
  res.status(HttpStatus.OK).sendFile(homeDir)
})

export default router
import fs from "fs"
import path from "path"

import multer from "multer"
import createError from "http-errors"

import { nanoid, alphabetLowerCaseLetters } from "../utils/nanoid.utils"

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const dir = "./uploads/products"
    fs.mkdirSync(dir, { recursive: true })
    return cb(null, dir)
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, nanoid(alphabetLowerCaseLetters, 16) + path.extname(file.originalname))
  },
})

const fileFilter = (req: any, file: any, cb: any) => {
  const ext = path.extname(file.originalname)
  const types = [".jpg", ".jpeg", ".png", ".webp", ".gif"]
  if (types.includes(ext)) return cb(null, true)
  return cb(createError.BadRequest("The submitted image format is not correct"))
}

const imageMaxSize = 1 * 1000 * 1000 // 1MB

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: imageMaxSize },
})

import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/app.config"

export const tokenGenerator = (mobile: string) => {
  const token = jwt.sign({ mobile }, SECRET_KEY, {
    expiresIn: "30d",
  })
  return token
}

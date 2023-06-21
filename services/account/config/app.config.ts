import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.SERVICE_URL || "localhost:3001"
export const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/grpc-store"
export const SECRET_KEY =
  process.env.SECRET_KEY ||
  "032AF2E4B0C670B6348A604B13FD074FCE77D6C8A6FF6A8361820DFFF87A600A"

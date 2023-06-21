import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.SERVICE_URL || "localhost:3002"
export const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/grpc-store"

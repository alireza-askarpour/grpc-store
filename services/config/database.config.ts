import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const MONGO_URI: any = process.env.MONGO_URI

class DBConnection {
  private static instance: DBConnection
  private constructor() {
    mongoose.set("strictQuery", false)
    mongoose.connect(MONGO_URI)

    mongoose.connection.on("connected", () => {
      console.log("✅ —> Mongoose connected to DB")
    })

    mongoose.connection.on("disconnected", () => {
      console.log("❌ —> Mongoose disconnected!")
    })

    process.on("SIGINT", async () => {
      await mongoose.connection.close()
      process.exit(0)
    })
  }

  public static getInstance(): DBConnection {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection()
    }
    return DBConnection.instance
  }
}

const dbConnection = DBConnection.getInstance()

export default dbConnection

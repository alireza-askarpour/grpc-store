import mongoose from "mongoose"

export class DBConnection {
  private static instance: DBConnection
  private constructor() {
    mongoose.set("strictQuery", false)
    mongoose.connect("mongodb://localhost:27017/grpc-store")

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

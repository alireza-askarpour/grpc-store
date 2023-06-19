import path from "path"
import dotenv from "dotenv"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

import { DBConnection } from "../config/database.config"
import { getOtp, checkOtp } from "./funcs/auth.grpc"

dotenv.config()
DBConnection.getInstance()

const protoPath = path.join(__dirname, "..", "..", "proto", "auth.proto")
const authProto = protoLoader.loadSync(protoPath)
const { authPackage } = grpc.loadPackageDefinition(authProto) as any

const port = process.env.SERVICE_URL || "localhost:3001"

const server = new grpc.Server()
server.addService(authPackage.AuthService.service, {
  getOtp,
  checkOtp,
})

server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err.message)
    process.exit(1)
  } else {
    server.start()
    console.info(`🏁 —> Auth service running on port ${port}`)
  }
})

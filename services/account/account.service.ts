import path from "path"
import dotenv from "dotenv"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

import { PORT, DB_URI } from "./config/app.config"
import DBConnection from "./config/database.config"

import { getOtp, checkOtp, verifyAccessToken, addToBasket, removeFromBasket } from "./controllers/account.controller"

dotenv.config()
DBConnection(DB_URI)

const protoPath = path.join(__dirname, "..", "..", "proto", "account.proto")
const accountProto = protoLoader.loadSync(protoPath)
const { accountPackage } = grpc.loadPackageDefinition(accountProto) as any

const server = new grpc.Server()
server.addService(accountPackage.AccountService.service, {
  getOtp,
  checkOtp,
  verifyAccessToken,
  addToBasket,
  removeFromBasket,
})

server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err.message)
    process.exit(1)
  } else {
    server.start()
    console.info(`🏁 —> Account service running on port ${port}`)
  }
})

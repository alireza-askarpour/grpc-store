import path from "path"
import dotenv from "dotenv"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

import { DBConnection } from "../config/database.config"
import { createCategory } from "./funcs/category.grpc"

dotenv.config()
DBConnection.getInstance()

const protoPath = path.join(__dirname, "..", "..", "proto", "category.proto")
const categoryProto = protoLoader.loadSync(protoPath)
const { categoryPackage } = grpc.loadPackageDefinition(categoryProto) as any

const port = process.env.SERVICE_URL || "localhost:3002"

const server = new grpc.Server()
server.addService(categoryPackage.CategoryService.service, {
  createCategory,
})

server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err.message)
    process.exit(1)
  } else {
    server.start()
    console.info(`🏁 —> Category service running on port ${port}`)
  }
})

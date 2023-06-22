import path from "path"
import dotenv from "dotenv"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

import { PORT, DB_URI } from "./config/app.config"
import DBConnection from "./config/database.config"

import { createProduct, updateProduct } from "./controllers/product.controller"

dotenv.config()
DBConnection(DB_URI)

const protoPath = path.join(__dirname, "..", "..", "proto", "product.proto")

const productProto = protoLoader.loadSync(protoPath)
const { productPackage } = grpc.loadPackageDefinition(productProto) as any

const server = new grpc.Server()
server.addService(productPackage.ProductService.service, {
  createProduct,
  updateProduct,
})

server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err.message)
    process.exit(1)
  } else {
    server.start()
    console.info(`🏁 —> Product service running on port ${port}`)
  }
})

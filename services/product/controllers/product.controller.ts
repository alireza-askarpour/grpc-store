import * as grpc from "@grpc/grpc-js"
import ProductModel from "../models/product.model"

export const createProduct = async (call: any, callback: any) => {
  try {
    const product = call.request

    const createdResult = await ProductModel.create(product)
    if (!createdResult) return callback({ code: grpc.status.INTERNAL, message: "FAILED_CREATE_PRODUCT" })

    callback(null, { status: "PRODUCT_CREATED_SUCCESS" })
  } catch (err) {
    call(err, null)
  }
}

export const updateProduct = async (call: any, callback: any) => {
  try {
    const product = call.request

    const updatedResult = await ProductModel.updateOne({ _id: product._id }, { $set: product })
    if (updatedResult.modifiedCount == 0)
      return callback({ code: grpc.status.INTERNAL, message: "FAILED_UPDATED_PRODUCT" })

    callback(null, { status: "PRODUCT_UPDATED_SUCCESS" })
  } catch (err) {
    call(err, null)
  }
}

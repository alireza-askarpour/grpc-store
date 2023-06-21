import * as grpc from "@grpc/grpc-js"
import CategoryModel from "../models/category.model"

export const createCategory = async (call: any, callback: any) => {
  try {
    const { name, value, parent } = call.request

    const existCategory = await CategoryModel.findOne({ name })
    if (existCategory)
      return callback(
        { code: grpc.status.INVALID_ARGUMENT, message: "CATEGORY_ALREADY_EXIST" },
        null
      )

    const newCategory = await CategoryModel.create({ name, value, parent })
    if (!newCategory)
      return callback(
        { code: grpc.status.INVALID_ARGUMENT, messae: "FAILED_CREATE_CATEGORY" },
        null
      )

    callback(null, newCategory)
  } catch (err) {
    callback(err, null)
  }
}

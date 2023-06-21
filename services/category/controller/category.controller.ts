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

export const updateCategory = async (call: any, callback: any) => {
  try {
    const { name, value, parent, _id } = call.request

    const existCategory = await CategoryModel.findById(_id)
    if (!existCategory)
      return callback(
        { code: grpc.status.NOT_FOUND, message: "NOT_FOUND_CATEGORY" },
        null
      )

    const updatedCategory = await CategoryModel.updateOne(
      { _id },
      { name, value, parent }
    )
    if (updatedCategory.modifiedCount == 0)
      return callback(
        { code: grpc.status.INTERNAL, messae: "FAILED_UPDATE_CATEGORY" },
        null
      )

    callback(null, { status: "UPDATED" })
  } catch (err) {
    callback(err, null)
  }
}

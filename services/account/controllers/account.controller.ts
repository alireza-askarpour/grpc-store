import JWT from "jsonwebtoken"
import * as grpc from "@grpc/grpc-js"

import UserModel from "../models/user.model"
import { generateRandomNumber } from "../utils/generate-number.utils"
import { tokenGenerator } from "../utils/sign-access-token.utils"
import { SECRET_KEY } from "../config/app.config"

export const getOtp = async (call: any, callback: any) => {
  try {
    const mobile = call.request?.mobile
    const code = generateRandomNumber()

    const result = await saveUser(mobile, code.toString())
    if (!result) return callback("FAILED_LOGIN", null)

    callback(null, { code, mobile })
  } catch (err) {
    callback(err, null)
  }
}

const saveUser = async (mobile: string, code: string) => {
  const otp = {
    code,
    expiresIn: new Date().getTime() + 120000,
  }
  const existUserResult = await checkExistUser(mobile)
  if (existUserResult) return await updateUser(mobile, { otp })

  return !!(await UserModel.create({ mobile, otp }))
}

const checkExistUser = async (mobile: string) => {
  const user = await UserModel.findOne({ mobile })
  return !!user
}

const updateUser = async (mobile: string, objectData: any) => {
  const nullish = ["", " ", 0, "0", null, undefined, NaN]
  Object.keys(objectData).map((key) => {
    if (nullish.includes(objectData[key])) delete objectData[key]
  })
  const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData })
  return !!updateResult.modifiedCount
}

export const checkOtp = async (call: any, callback: any) => {
  try {
    const { mobile, code } = call.request
    const user: any = await UserModel.findOne({ mobile })

    if (!user) return callback({ code: grpc.status.NOT_FOUND, message: "NOT_FOUND_USER" }, null)

    const now = Date.now()
    if (user.otp.code != code) {
      return callback({ code: grpc.status.OUT_OF_RANGE, message: "CODE_SENT_IS_NOT_CORRECT" }, null)
    }

    if (+user.otp.expiresIn < now) {
      return callback({ code: grpc.status.OUT_OF_RANGE, message: "YOUR_CODE_HAS_EXPIRED" }, null)
    }

    const accessToken = tokenGenerator(user.mobile)

    return callback(null, { accessToken })
  } catch (err) {
    callback(err, null)
  }
}

export const verifyAccessToken = async (call: any, callback: any) => {
  try {
    const accessToken = call.request?.accessToken
    const payload: any = JWT.verify(accessToken, SECRET_KEY)
    if (!payload?.mobile) return callback({ code: grpc.status.UNAUTHENTICATED, message: "UNAUTHORIZED" }, null)

    const user = await UserModel.findOne({ mobile: payload.mobile }, { otp: 0 })
    if (!user) return callback({ code: grpc.status.UNAUTHENTICATED, message: "UNAUTHORIZED" }, null)

    callback(null, { user })
  } catch (err) {
    callback(err, null)
  }
}

export const addToBasket = async (call: any, callback: any) => {
  try {
    const { userId, productId } = call.request

    // check exist user
    const user = await UserModel.findById(userId)
    if (!user) {
      return callback({ code: grpc.status.NOT_FOUND, message: "USER_NOT_FOUND" }, null)
    }

    // check exist product
    const product = await UserModel.findOne({ _id: userId, basket: productId })
    if (product) {
      return callback({ code: grpc.status.INVALID_ARGUMENT, message: "PRODUCT_ALREADY_EXISTS" }, null)
    }

    await UserModel.updateOne({ _id: userId }, { $push: { basket: productId } })

    callback(null, { status: "PRODUCT_ADDEDD_TO_BASKET" })
  } catch (err) {
    callback(err, null)
  }
}

export const removeFromBasket = async (call: any, callback: any) => {
  try {
    const { userId, productId } = call.request

    // check exist user
    const user = await UserModel.findById(userId)
    if (!user) {
      return callback({ code: grpc.status.NOT_FOUND, message: "USER_NOT_FOUND" }, null)
    }

    // check exist product
    const product = await UserModel.findOne({ _id: userId, basket: productId })
    if (!product) {
      return callback({ code: grpc.status.NOT_FOUND, message: "PRODUCT_NOT_FOUND" }, null)
    }

    await UserModel.updateOne({ _id: userId }, { $pull: { basket: productId } })

    callback(null, { status: "PRODUCT_REMOED_FROM_BASKET" })
  } catch (err) {
    callback(err, null)
  }
}

import JWT from "jsonwebtoken"
import * as grpc from "@grpc/grpc-js"

import UserModel from "../../users/models/user.model"
import { generateRandomNumber } from "./generate-number.utils"

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

    if (!user)
      return callback(
        {
          code: grpc.status.NOT_FOUND,
          message: "NOT_FOUND_USER",
        },
        null
      )

    const now = Date.now()
    if (user.otp.code != code)
      return callback(
        {
          code: grpc.status.OUT_OF_RANGE,
          message: "CODE_SENT_IS_NOT_CORRECT",
        },
        null
      )

    if (+user.otp.expiresIn < now)
      return callback(
        {
          code: grpc.status.OUT_OF_RANGE,
          message: "YOUR_CODE_HAS_EXPIRED",
        },
        null
      )

    const accessToken = await signAccessToken(user._id)

    return callback(null, { accessToken })
  } catch (err) {
    callback(err, null)
  }
}

export const signAccessToken = (userId: string) => {
  return new Promise(async (resolve, reject) => {
    const user: any = await UserModel.findById(userId)
    const privateKey: string = process.env.ACCESS_TOKEN_SECRET_KEY || "tset"

    const payload = {
      mobile: user.mobile,
    }
    const options = {
      expiresIn: "30d",
    }

    JWT.sign(payload, privateKey, options, function (err, token) {
      if (err) reject({ status: grpc.status.INTERNAL, message: "INTERNAL_SERVER_ERROR" })
      resolve(token)
    })
  })
}

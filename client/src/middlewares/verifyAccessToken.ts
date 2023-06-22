import path from "path"
import createError from "http-errors"
import { NextFunction, Request, Response } from "express"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

interface IResponse {
  is_valid: boolean
  user: any
}

interface CustomRequest extends Request {
  user?: any
}

const protoPath = path.join(__dirname, "..", "..", "..", "proto", "account.proto")

const accountProto = protoLoader.loadSync(protoPath)
const { accountPackage } = grpc.loadPackageDefinition(accountProto) as any

const accountClient = new accountPackage.AccountService(
  process.env.ACCOUNT_SERVICE_URL,
  grpc.credentials.createInsecure()
)

export const verifyAccessToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.headers?.authorization) {
      return next(createError.Unauthorized("UNAUTHORIZED"))
    }

    const [bearer, token] = req.headers?.authorization?.split(" ")
    const validData = ["Bearer", "bearer"]

    if (!token || !validData.includes(bearer)) return next(createError.Unauthorized("UNAUTHORIZED"))
    accountClient.verifyAccessToken({ accessToken: token }, (err: grpc.ServiceError, data: IResponse) => {
      if (err) return next(createError.Unauthorized("UNAUTHORIZED"))
      req.user = data.user
      return next()
    })
  } catch (error) {
    next(error)
  }
}

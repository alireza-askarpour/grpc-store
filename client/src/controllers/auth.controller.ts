import path from "path"
import createError from "http-errors"
import { NextFunction, Request, Response } from "express"
import { StatusCodes as HttpStatus } from "http-status-codes"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

import { checkOtpSchema, getOtpSchema } from "../validations/auth.validation"
import { convertGrpcErrorToHttpError } from "../utils/convert-grpc-error-to-http"

const protoPath = path.join(__dirname, "..", "..", "..", "proto", "auth.proto")
const authProto = protoLoader.loadSync(protoPath)
const { authPackage } = grpc.loadPackageDefinition(authProto) as any
const authClient = new authPackage.AuthService(
  process.env.SERVICE_URL,
  grpc.credentials.createInsecure()
)

export const getOtp = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = getOtpSchema.validate(req.body)
  if (error?.message) throw createError.BadRequest(error.message)

  authClient.getOtp(
    value,
    (err: grpc.ServiceError, data: { mobile: string; code: string }) => {
      if (err) return next(convertGrpcErrorToHttpError(err))

      res.status(HttpStatus.CREATED).json({
        success: true,
        statusCode: HttpStatus.CREATED,
        data,
      })
    }
  )
}

export const checkOtp = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = checkOtpSchema.validate(req.body)
  if (error?.message) throw createError.BadRequest(error.message)

  authClient.checkOtp(
    value,
    (err: grpc.ServiceError | undefined, data: { accessToken: string }) => {
      if (err) return next(convertGrpcErrorToHttpError(err))

      res.status(HttpStatus.CREATED).json({
        success: true,
        statusCode: HttpStatus.CREATED,
        data,
      })
    }
  )
}

import path from "path"
import createError from "http-errors"
import { NextFunction, Request, Response } from "express"
import { StatusCodes as HttpStatus } from "http-status-codes"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

import { createCategorySchema } from "../validations/category.validation"
import { convertGrpcErrorToHttpError } from "../utils/convert-grpc-error-to-http"

const protoPath = path.join(__dirname, "..", "..", "..", "proto", "category.proto")
const categoryProto = protoLoader.loadSync(protoPath)
const { categoryPackage } = grpc.loadPackageDefinition(categoryProto) as any
const categoryClient = new categoryPackage.CategoryService(
  process.env.CATEGORY_SERVICE_URL,
  grpc.credentials.createInsecure()
)

export const createCategory = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createCategorySchema.validate(req.body)
  if (error?.message) throw createError.BadRequest(error.message)

  categoryClient.createCategory(value, (err: grpc.ServiceError, data: any) => {
    if (err) return next(convertGrpcErrorToHttpError(err))

    res.status(HttpStatus.CREATED).json({
      success: true,
      statusCode: HttpStatus.CREATED,
      data,
    })
  })
}

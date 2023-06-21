import path from "path"
import createError from "http-errors"
import { NextFunction, Request, Response } from "express"
import { StatusCodes as HttpStatus } from "http-status-codes"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation"
import { objectIdValidation } from "../validations/public.validation"

import { catchAsync } from "../utils/catch-async"
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

/**
 * Update category by ID
 */
export const updateCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const dataParams = await objectIdValidation.validateAsync(req.params)
    const dataBody = await updateCategorySchema.validateAsync(req.body)

    const category = {
      ...dataBody,
      _id: dataParams.id,
    }

    categoryClient.updateCategory(category, (err: grpc.ServiceError, data: any) => {
      if (err) return next(convertGrpcErrorToHttpError(err))

      res.status(HttpStatus.OK).json({
        success: true,
        statusCode: HttpStatus.OK,
        data,
      })
    })
  }
)

/**
 * Update category by ID
 */
export const removeCategory = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = objectIdValidation.validate(req.params)
  if (error?.message) throw createError.BadRequest(error.message)

  categoryClient.removeCategory(
    { _id: value.id },
    (err: grpc.ServiceError, data: any) => {
      if (err) return next(convertGrpcErrorToHttpError(err))

      res.status(HttpStatus.OK).json({
        success: true,
        statusCode: HttpStatus.OK,
        data,
      })
    }
  )
}

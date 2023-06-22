import path from "path"
import createError from "http-errors"
import { NextFunction, Response } from "express"
import { StatusCodes as HttpStatus } from "http-status-codes"
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"

import { deleteFile } from "../utils/deleteFile.utils"
import { listOfImagesFromRequest } from "../utils/images-from-request.utils"
import { convertGrpcErrorToHttpError } from "../utils/convert-grpc-error-to-http"

import { objectIdValidation } from "../validations/public.validation"
import { createProductValidation, updateProductValidation } from "../validations/product.validation"

const protoPath = path.join(__dirname, "..", "..", "..", "proto", "product.proto")

const productProto = protoLoader.loadSync(protoPath)
const { productPackage } = grpc.loadPackageDefinition(productProto) as any

const productClient = new productPackage.ProductService(
  process.env.PRODUCT_SERVICE_URL,
  grpc.credentials.createInsecure()
)

export const createProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.body?.tags) req.body.tags = []

    if (req?.files) {
      const images = listOfImagesFromRequest(req.files)
      req.body.images = images
    }

    const productDataBody = await createProductValidation.validateAsync(req.body)

    const supplier = req?.user?._id
    const product = { ...productDataBody, supplier }

    productClient.createProduct(product, (err: grpc.ServiceError) => {
      if (err) return next(convertGrpcErrorToHttpError(err))
    })

    res.status(HttpStatus.CREATED).json({
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "PRODUCT_CREATED_SUCCESS",
    })
  } catch (err) {
    if (req?.files) {
      const images = listOfImagesFromRequest(req.files)
      await deleteFile(images)
    }
    next(err)
  }
}

export const updateProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.body?.tags) req.body.tags = []

    if (req?.files) {
      const images = listOfImagesFromRequest(req.files)
      req.body.images = images
    }

    const { id: _id } = await objectIdValidation.validateAsync({ id: req.params.id })
    const productDataBody = await updateProductValidation.validateAsync(req.body)

    const product = { ...productDataBody, _id }

    productClient.updateProduct(product, (err: grpc.ServiceError) => {
      if (err) return next(convertGrpcErrorToHttpError(err))

      res.status(HttpStatus.OK).json({
        success: true,
        statusCode: HttpStatus.OK,
        message: "PRODUCT_CREATED_UPDATED",
      })
    })
  } catch (err) {
    if (req?.files) {
      const images = listOfImagesFromRequest(req.files)
      await deleteFile(images)
    }
    next(err)
  }
}

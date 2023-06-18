import chalk from "chalk"
import dotenv from "dotenv"
import createError from "http-errors"
import { NextFunction, Request, Response } from "express"

dotenv.config()

export const port = process.env.PORT || 3000
export const mode = process.env.NODE_ENV || "production"

export const isProduction = process.env.NODE_ENV === "production"
export const isDevelopment = process.env.NODE_ENV === "development"

export const appListener = () => {
  const runningMode = `Server running in ${chalk.bold(mode)} mode`
  const runningOnPort = `on port ${chalk.bold(port)} port`
  const runningSince = `[since ${new Date().toISOString()}]`
  console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`)
}

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serverError = createError.InternalServerError("INTERNAL_SERVER_ERROR")
  const statusCode = err?.status || serverError.status
  const message = err?.message || serverError.message
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
}

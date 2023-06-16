import dotenv from "dotenv"
import createError from "http-errors"
import express, { NextFunction, Request, Response } from "express"

import { appListener, globalErrorHandler, port } from "./config/app.config"
import allRoutes from "./routes/index.routes"

// config
dotenv.config()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))

// routes
app.use(allRoutes)

// error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound(`Can't find ${req.originalUrl} on the server!`))
})
app.use(globalErrorHandler)

// listener
app.listen(port, appListener)

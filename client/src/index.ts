import cors from "cors"
import dotenv from "dotenv"
import createError from "http-errors"
import swaggerUI from "swagger-ui-express"
import express, { NextFunction, Request } from "express"

import { morganMiddleware } from "./middlewares/morgan.middleware"

import { swaggerSetup } from "./config/swagger.config"
import { appListener, globalErrorHandler, port } from "./config/app.config"

import allRoutes from "./routes/index.routes"

// config
dotenv.config()

const app = express()

// middlewares
app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))

// settings
app.use("/docs", swaggerUI.serve, swaggerSetup)

// auth
app.use(cors({ origin: "*" }))

// routes
app.use(allRoutes)

// error handler
app.use((req: Request, _, next: NextFunction) => {
  next(createError.NotFound(`Can't find ${req.originalUrl} on the server!`))
})
app.use(globalErrorHandler)

// listener
app.listen(port, appListener)

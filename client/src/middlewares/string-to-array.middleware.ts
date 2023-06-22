import { NextFunction, Request, Response } from "express"

export const stringToArray =
  (...fields: [string]) =>
  (req: Request, res: Response, next: NextFunction) => {
    fields.forEach((field) => {
      if (req.body[field]) {
        const value = Array.isArray(req.body[field])
          ? req.body[field].map((item: string) => item.trim())
          : req.body[field].trim().split(",")

        req.body[field] = [...new Set(value)]
      }
    })
    next()
  }
